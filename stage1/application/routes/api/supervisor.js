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

module.exports = router;
