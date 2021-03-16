
module.exports.createTransaction = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                account_id: { type: 'string' },
                amount: { type: 'integer' },
            },
            required: ['account_id', 'amount'] // Insert here all required event properties
        },
        headers: {
            type: 'object',
            properties: {
                "transaction-id": { type: 'string' },
            },
            required: ['transaction-id']
        }
    }
}
