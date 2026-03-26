const mongoose = require('mongoose')
const connectDb = async () => {
    try {
       await mongoose.connect(process.env.mongodb);
       console.log('Connected')
    } catch(error) {
       console.log(error)
       process.exit(1);
    }
}