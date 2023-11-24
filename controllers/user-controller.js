const { User, Thought } = require("../models");

const userController = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
}

module.exports = userController;