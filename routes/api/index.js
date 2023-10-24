const router = require('express').Router();
const userRoutes = require('./userRoutes');
// Comment out while working on User routes: const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
// Comment out while working on User routes: router.use('/thoughts', thoughtRoutes);

module.exports = router;
