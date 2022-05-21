const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateTopicRegisterInput = require('../../validation/topic');
const Topic = require('../../models/topic');

router.post('/topic-add', (req, res) => {
    const { errors, isValid } = validateTopicRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Topic.findOne({ topicName: req.body.topicName }).then(topic => {
        if (topic) {
            return res.status(400).json({ topicName: 'Topic already exists' });
        } else {
            const newTopic = new Topic({
                topicName: req.body.topicName,
                groupName: req.body.groupName
            });
            newTopic
                        .save()
                        .then(topic => {
                            return res.status(200).json({message: 'Topic registered successfully. Refreshing data...'})
                        }).catch(err => console.log(err)); 
        }
    });
});

router.post('/topic-data', (req, res) => {
    Topic.find({}).then(topic => {
        if (topic) {
            return res.status(200).send(topic);
        }
    });
});

router.post('/topic-delete', (req, res) => {
    Topic.deleteOne({ _id: req.body._id}).then(topic => {
        if (topic) {
            return res.status(200).json({message: 'User deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/topic-update', (req, res) => {
    const { errors, isValid } = validateUpdateUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    User.findOne({ _id }).then(user => {
        if (user) {
            if (req.body.password !== '') {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                    });
                });
            }
            let update = {'name': req.body.name, 'email': req.body.email, 'password': user.password};
            User.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update user.' });
                } else {
                    return res.status(200).json({ message: 'User updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now user found to update.' });
        }
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: 'Email not found' });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ password: 'Password incorrect' });
            }
        });
    });
});


module.exports = router;
