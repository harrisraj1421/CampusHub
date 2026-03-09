require('dotenv').config();
const mongoose = require('mongoose');

console.log('Attempting to connect to:', process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connection Successful!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Connection Failed:', err);
        process.exit(1);
    });
