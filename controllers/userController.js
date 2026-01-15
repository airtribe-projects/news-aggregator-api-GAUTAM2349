const bcrypt = require('bcrypt');
const jwtService = require('../services/jwtService');

// In-memory store
const users = [];

const signup = async (req, res) => {
    const { name, email, password, preferences } = req.body;

    if (!email || !name || !password) {
        return res.status(400).send("Missing required fields");
    }

    if (users.find(u => u.email === email)) {
        return res.status(400).send("User already exists"); // Or 409 Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
        name,
        email,
        password: hashedPassword,
        preferences: preferences || []
    };

    users.push(newUser);
    const token = jwtService.generateToken({ email: newUser.email });
    res.status(200).json({ token, message: "User registered successfully" });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).send("Invalid email or password");
    }

    const token = jwtService.generateToken({ email: user.email });
    res.status(200).json({ token });
};

const getPreferences = (req, res) => {
    const user = users.find(u => u.email === req.user.email);
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.status(200).json({ preferences: user.preferences });
};

const updatePreferences = (req, res) => {
    const { preferences } = req.body;
    const user = users.find(u => u.email === req.user.email);
    
    if (!user) {
        return res.status(404).send("User not found");
    }

    user.preferences = preferences;
    res.status(200).send("Preferences updated");
};

module.exports = {
    signup,
    login,
    getPreferences,
    updatePreferences,
    users
};
