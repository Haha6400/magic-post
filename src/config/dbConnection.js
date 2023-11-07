const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/MagicPost?authMechanism=DEFAULT')
            .then(() => console.log('Database Connected!'));
    } catch (error) {
        console.log('Fail!')
    }

}


module.exports = connect;