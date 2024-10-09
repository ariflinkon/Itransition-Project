const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error registering user.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid Password' });
        }
        const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400 });
        res.status(200).send({ accessToken: token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error logging in.' });
    }
};
