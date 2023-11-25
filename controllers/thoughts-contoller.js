const { Thought } = require("../models");

const thoughtsController = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id" });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({
                _id: req.params.thoughtId,
            });
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id" });
            }
            res.json({ message: "Thought deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        const { reactionBody, username } = req.body;
        const { thoughtId } = req.params;

        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                {
                    $push: {
                        reactions: { reactionBody, username },
                    },
                },
                { new: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: "Thought not found" });
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        const { thoughtId, reactionId } = req.params;

        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                thoughtId,
                {
                    $pull: {
                        reactions: { _id: reactionId },
                    },
                },
                { new: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: "Thought not found" });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtsController;
