// Need to import "Reaction" and "Thought" if they are never used?
// Need to import "mongoose" if it is never used?
// Keep "Reaction" Model or embed it in "Thought" Model?

const { Reaction, Thought, User } = require('../models');
const mongoose = require('mongoose');

const connection = require('../config/connection');

// Seed data:
const users = [
    {
        username: 'Scott',
        email: 'scott@yahoo.com',
        thought: [],
    },
];

console.log(connection);

// Connects to server:
connection.once('open', async () => {
    console.log('Connected');

    // Delete existing users:
    await User.deleteMany({});

    // Add seed data to db:
    await User.collection.insertMany(users);

    console.table(users);
    console.info('Seeding complete!');
    process.exit(0);
});
