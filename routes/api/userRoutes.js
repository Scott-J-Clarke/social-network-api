const router = require('express').Router();
const { 
    getUsers,
    getSingleUser 
} = require('../../controllers/userController');

router.route('/').get(getUsers);

// Have yet to write this backend route in 'controllers/userController.js':
// router.route('/:userId').get(getSingleUser);

module.exports = router;
