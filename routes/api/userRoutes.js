const router = require('express').Router();
const { 
    getUsers,
    getSingleUser,
    createUser,
    updateUser, 
    deleteUser,
    addFriend,
    deleteFriend 
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId

// Insomnia test code to add Evelyn as a friend to Alice:

// (Below is Alice's "_id" with Evelyn's "_id" afterwards:)
// POST localhost:3001/api/users/6537e6e4d810c1b204aa9b27/friends/653926a0e40d5c1f6c7a9b0f

// (Below is Evelyn's "_id" in the body of the POST request:)
// { "_id": "653926a0e40d5c1f6c7a9b0f" }
router
    .route('/:userId/friends/:friendId')
    .post(addFriend) 
    .delete(deleteFriend); 

module.exports = router;
