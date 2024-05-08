const express = require('express')

const router = express.Router()

const User = require('../models/userModel')

router.post('/create-user', async (req, res) => {
    const { name, email, sessionId } = req.body;
    console.log('Datos recibidos:', { name, email, sessionId });

    const user = new User({
        name,
        email,
        sessionId,
        _id: req.body._id,
    });

    try {
        await user.save();
        console.log('Usuario guardado:', user);
        res.status(200).send({ data: user });
    } catch (err) {
        console.error('Error al guardar el usuario:', err);
        res.status(400).send({ error : err.message });
    }
});

module.exports = router