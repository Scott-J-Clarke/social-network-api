/* eslint-disable no-undef */
const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            return res.status(200).json(thoughts);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID.' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const updatedUser = await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user with this ID.' });
            }

            res.json({ message: 'Thought successfully created!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID.' })
            }

            res.json({ message: 'Thought successfully updated!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID.' });
            }

            const updateUser = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!updateUser) {
                return res.status(404).json({ message: 'Thought deleted, but no user found.' })
            }

            res.json({ message: "Thought successfully deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
