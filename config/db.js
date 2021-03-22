const mongoose = require('mongoose');
const dbConfig = require('./dbConfig')
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbConfig.database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB Connected:${conn.connection.host}`)
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}
module.exports = connectDB;