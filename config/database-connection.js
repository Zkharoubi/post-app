const mongoose = require("mongoose")

module.exports = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("connected")
    } catch (error) {
        console.log("error with connection", error.message)
    }
}
