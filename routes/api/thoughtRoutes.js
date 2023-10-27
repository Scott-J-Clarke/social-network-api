/* eslint-disable no-undef */
const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    deleteThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .delete(deleteThought);

module.exports = router;
