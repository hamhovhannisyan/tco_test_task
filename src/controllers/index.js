const {Transaction, Account, sequelize} = require('../models');

module.exports.getPing = async (req,res,next)=>{
    await sequelize.authenticate()
    res.send({
        message: "pong"
    })
};

module.exports.createTransaction = async (req,res,next) => {
    const transactionObject = await Transaction.findOne({where: {id:req.headers["transaction-id"]},include: ['account']}, );
    if (transactionObject) {
        return res.send({
            account_id: transactionObject.account.id,
            amount: transactionObject.account.balance
        });
    }
    // Start transaction
    const t = await sequelize.transaction();
    let accountObject = null
    try {
        accountObject = await Account.findByPk(req.body.account_id, {transaction: t});
        if (accountObject) {
            accountObject.balance += req.body.amount
            await accountObject.save({transaction: t})
        } else accountObject = await Account.create({
            id: req.body.account_id,
            balance: req.body.amount
        }, {transaction: t});

        await Transaction.create({
            amount: req.body.amount,
            account_id: req.body.account_id,
            id: req.headers["transaction-id"]
        }, {transaction: t});
        
        await t.commit()
    } catch (e) {
        await t.rollback()
        return next(e)
    }

   res.send({
       account_id: accountObject.id,
       amount: accountObject.balance
   })
};

module.exports.getTranscation = async (req,res,next) => {
    const transactionObject = await Transaction.findByPk(req.params.transaction_id);
    if (!transactionObject) return res.status(404).send({message: `Transaction with ${req.headers["transaction-id"]} id does not exist`})
    res.send({
        account_id: transactionObject.account_id,
        amount: transactionObject.amount
    })
}

module.exports.getAccountBalnace = async (req,res,next) => {
    const accountObject = await Account.findByPk(req.params.account_id);
    if (!accountObject) return res.status(404).send({message: `Account with ${req.params.account_id} id does not exist`})
    res.send({
        balance: accountObject.balance
    })
    
}
 module.exports.getMaxTransactionVolume = async (req,res,next) => {
    const maxAccounts = await Transaction.count({group: ['account_id']});
    console.log(maxAccounts)
    const maxVolume = Math.max(...maxAccounts.map(elem => elem.count))
    
    res.send({
        maxVolume: maxVolume,
        accounts: maxAccounts
            .filter(elem => elem.count === maxVolume)
            .map(elem => elem.account_id)
    })
}
