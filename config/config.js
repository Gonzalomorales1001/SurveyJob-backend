const mongoose=require('mongoose')

const DBconnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN)
        console.log('Database connection successfully')
    } catch (err) {
        console.log(err)
        throw new Error('Failed to connect to database')
    }
}

module.exports={
    DBconnection
}