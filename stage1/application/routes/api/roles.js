const express = require('express');
const router = express.Router();
const validateRoleInput = require('../../validation/role');
const Role = require('../../models/Role');

router.post('/role-add', (req, res) => {
    const { errors, isValid } = validateRoleInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Role.findOne({ name: req.body.name }).then(role => {
        if (role) {
            return res.status(400).json({ name: 'Role already exists' });
        } else {
            const newRole = new Role({
                name: req.body.name,
                description: req.body.description
            });
            newRole
                .save()
                .then(role => {
                    return res.status(200).json({ message: 'Role added successfully. Refreshing data...' })
                }).catch(err => console.log(err));
        }
    });
});

router.post('/role-data', (req, res) => {
    Role.find({}).then(role => {
        if (role) {
            return res.status(200).send(role);
        }
    });
});

router.post('/role-delete', (req, res) => {
    Role.deleteOne({ _id: req.body._id }).then(role => {
        if (role) {
            return res.status(200).json({ message: 'Role deleted successfully. Refreshing data...', success: true })
        }
    });
});

router.post('/role-update', (req, res) => {
    const { errors, isValid } = validateRoleInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    Role.findOne({ _id }).then(role => {
        if (role) {
            let update = { 'name': req.body.name, 'description': req.body.description};
            Role.update({ _id: _id }, { $set: update }, function (err, result) {
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
