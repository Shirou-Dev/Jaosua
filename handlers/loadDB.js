const mongoose = require('mongoose');
const { MONGO_URI } = require('../config.js');

module.exports = async (client) => {
    try {
        mongoose.set('strictQuery', true);

        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(client.logger.info('DataBase Is Connected!'))
    } catch (e) {
        client.logger.danger(e)
        console.log(e);
    }
} 