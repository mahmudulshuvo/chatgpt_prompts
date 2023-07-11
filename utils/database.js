import mongoose from "mongoose"

let isConnected = false
// Connect to MongoDB
const connectToDB = async () => {
    mongoose.set("strictQuery", true)

    if (isConnected) {
        console.log("Already connected to DB")
        return
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        isConnected = conn.connections[0].readyState // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectToDB
