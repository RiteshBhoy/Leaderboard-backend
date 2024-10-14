const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');

        // Sample users
        const users = [
            { name: 'Rahul' },
            { name: 'Kamal' },
            { name: 'Sanaki' },
            { name: 'John' },
            { name: 'Alice' },
            { name: 'Bob' },
            { name: 'Charlie' },
            { name: 'David' },
            { name: 'Eva' },
            { name: 'Frank' },
        ];

        await User.insertMany(users);
        console.log('Users seeded');
        mongoose.connection.close();
    })
    .catch(err => console.error(err));
