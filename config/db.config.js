const mongoose = require('mongoose');

async function connectToDb() {
    await mongoose.connect(
        'mongodb+srv://petrykkateryna:HGsdUaC6z5kECa42@liube.vbx8lql.mongodb.net/?retryWrites=true&w=majority&appName=Liube',
    );
}

mongoose.connection.on('error', err => {
    console.log(err);
});

module.exports = () =>
    connectToDb()
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch(console.log);
