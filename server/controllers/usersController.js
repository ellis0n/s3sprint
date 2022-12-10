const User = require("../model/User");

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne
        ({
            username: username,
            password: password
        });
        if (user) {
            res.status(200).json({ message: "success", user
            });
        } else {
            res.status(401).json({ message: "failed" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User
        .findOne
        ({
            username: username,
        });
        if (user) {
            res.status(401).json({ message: "Username exists." });
        }
        else {
            const newUser = await User.create({
                username: username,
                password: password
            });
            res.status(200).json({ message: "User created.", newUser });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};

module.exports = { loginUser, registerUser };