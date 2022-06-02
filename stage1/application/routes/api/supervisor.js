const express = require('express');
const router = express.Router();
const validateSupervisorRequest = require('../../validation/supervisorRequest');
const Supervisor = require('../../models/supervisor');


router.post('/supervisorRequest', (req, res) => {
    const { errors, isValid } = validateSupervisorRequest(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Supervisor.findOne({ supervisorname: req.body.supervisorname }).then(supervisor => {
        if (supervisor) {
            return res.status(400).json({ name: 'Supervisor already acllocated to a group' });
        } else {
            const newSupervisor = new Supervisor({
                supervisorname: req.body.supervisorname,
                groupname: req.body.groupname,
                topic: req.body.topic
            });
            newSupervisor
                .save()
                .then(supervisor => {
                    return res.status(200).json({ message: 'Supervisor requested successfully.' })
                }).catch(err => console.log(err));
        }
    });
});

router.post('/supervisor-data', (req, res) => {
    Supervisor.find({}).then(supervisor => {
        if (supervisor) {
            return res.status(200).send(supervisor);
        }
    });
});

router.post('/supervisor-delete', (req, res) => {
    Supervisor.deleteOne({ _id: req.body._id}).then(supervisor => {
        if (supervisor) {
            return res.status(200).json({message: 'User deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/supervisor-update', (req, res) => {
    const { errors, isValid } = validateSupervisorRequest(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    Supervisor.findOne({ _id }).then(supervisor => {
        if (supervisor) {
            let update = { 'supervisorname': req.body.supervisorname, 'groupname': req.body.groupname, 'topic': req.body.topic };
            Supervisor.updateOne({ _id: _id }, { $set: update }, function (err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update Supervisor.' });
                } else {
                    return res.status(200).json({ message: 'Supervisor updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now Supervisor found to update.' });
        }
    });
});

module.exports = router;
