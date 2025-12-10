import mongoose from "mongoose";

export const connectDatabase = () => {
    console.log("Connecting to the database.");

    mongoose.connect(
        process.env.CONNECTION_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
        .then(() => console.log("MongoDB Atlas Connected."))
        .catch((error) => console.log(error));
}

