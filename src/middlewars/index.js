const Ajv = require('ajv').default;

module.exports.validate = (schema) => (req,res,next) => {
    const ajv = new Ajv()
    const ajvInstance = ajv.compile(schema);
    const valid = ajvInstance(req)
    if (!valid) return res.status(400).send(ajvInstance.errors);
    next()
}

module.exports.unsupportedMediaTypes = (contentTypes) => (req, res, next)=> {
    if (contentTypes.indexOf(req.headers["content-type"]) != -1) return next({status: 415, message: 'Unsupported Media Type'})
    next()
}