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

router.post('/topic-updates', (req, res) => {
    const { errors, isValid } = validateTopicRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    Topic.findOne({ _id }).then(topic => {
        if (topic) {
            let update = { 'groupName': req.body.groupName, 'topicName': req.body.topicName};
            Topic.updateOne({ _id: _id }, { $set: update }, function (err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update topic.' });
                } else {
                    return res.status(200).json({ message: 'Topic updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now topic found to update.' });
        }
    });
});


module.exports = router;
