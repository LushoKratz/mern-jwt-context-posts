import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/mern-jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database connected'))
    .catch(error => console.log('Error to connect to DB: ', error))