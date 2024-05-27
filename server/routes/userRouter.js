const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/create-user', async (req, res) => {
    const { name, email, sessionId, role } = req.body;
    console.log('Datos recibidos:', { name, email, sessionId, role });

    const user = new User({
        name,
        email,
        sessionId,
        role: role || 'worker', 
    });

    try {
        await user.save();
        console.log('Usuario guardado:', user);
        res.status(200).send({ data: user });
    } catch (err) {
        console.error('Error al guardar el usuario:', err);
        res.status(400).send({ error: err.message });
    }
});

router.get('/user/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await User.findOne({ sessionId: uid });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send({ data: user });
    } catch (err) {
        res.status(500).send({ error: 'Error fetching user data' });
    }
});
module.exports = router;