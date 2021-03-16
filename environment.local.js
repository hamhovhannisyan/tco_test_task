module.exports = {
    db: {
        "dialect": "sqlite",
        "storage": "database.sqlite",
        "sync": {
            "force": true // WARNING, very dangerous
        }
    }
}