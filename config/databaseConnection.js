const mongoose = require("mongoose")

module.exports = async()=>{
try {
const conn = await mongoose.connect("mongodb+srv://zaynab:yes.2122019@cluster0.h1xuyoy.mongodb.net/?appName=Cluster0")
console.log("connected")
} catch (error) {
    console.log("error with connection",error.message)
}
}
  