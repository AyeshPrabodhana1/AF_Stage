const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateGroupRegisterInput = require('../../validation/groupRegister');
const Group = require('../../models/groupReg');

router.post('/group-add', (req, res) => {
    const { errors, isValid } = validateGroupRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Group.findOne({ groupName: req.body.groupName }).then(group => {
        if (group) {
            return res.status(400).json({ groupName: 'Group already exists' });
        } else {
            const newGroup = new Group({
                groupName: req.body.groupName,
                student_1: req.body.student_1,
                student_2: req.body.student_2,
                student_3: req.body.student_3,
                student_4: req.body.student_4
            });
                    newGroup
                        .save()
                        .then(group => {
                            return res.status(200).json({message: 'group registered successfully. Refreshing data...'})
                        }).catch(err => console.log(err));
              
        }
    });
});

router.post('/group-data', (req, res) => {
    Group.find({}).then(group => {
        if (group) {
            return res.status(200).send(group);
        }
    });
});

router.post('/group-id-data', (req, res) => {
    Group.findOne({groupName: req.body.groupName}).then(group => {
        if (group) {
            return res.status(200).send(group);
        }
    });
});

router.post('/group-delete', (req, res) => {
    Group.deleteOne({ groupName: req.body.groupName}).then(group => {
        if (group) {
            return res.status(200).json({message: 'User deleted successfully. Refreshing data...', success: true})
        }
    });
});


router.post('/group-update', (req, res) => {
    const { errors, isValid } = validateGroupRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    Group.findOne({ _id }).then(group => {
        if (group) {
            let update = { 'groupName': req.body.groupName, 'student_1': req.body.student_1,'student_2':req.body.student_2,'student_3':req.body.student_3,'student_4':req.body.student_4};
            Group.updateOne({ _id: _id }, { $set: update }, function (err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update role.' });
                } else {
                    return res.status(200).json({ message: 'Role updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now role found to update.' });
        }
    });
});



module.exports = router;
