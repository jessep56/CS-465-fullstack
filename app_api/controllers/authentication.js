const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields required" });
    }

    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        await user.save(); // Using async/await instead of callbacks
        const token = user.generateJwt();
        res.status(200).json({ token });

    } catch (err) {
        res.status(400).json(err);
    }
};


const login = (req, res) => {
    console.log("Login function called");

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields required" });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log("Login error:", err);
            return res.status(404).json(err);
        }
        if (user) {
            console.log("Login successful"); 
            const token = user.generateJwt();
            return res.status(200).json({ token });
        } else {
            console.log("Login failed:", info); 
            return res.status(401).json(info);
        }
    })(req, res);
};


module.exports = {
    register,
    login
};
