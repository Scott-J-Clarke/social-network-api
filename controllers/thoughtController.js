const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.error({ message: err });
            return res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.userId });
        
            !thought
                ? res.status(404).json({ message: 'No thought with that ID.' })
                : res.json(thought);
            } catch (err) {
                res.status(500).json(err)
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

            res.json({ message: 'Thought successfully created!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID.' });
            }

            res.json({ message: "Thought successfully deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
