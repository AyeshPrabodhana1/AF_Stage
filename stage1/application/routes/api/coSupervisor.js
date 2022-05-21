const express = require('express');
const router = express.Router();
const validateCoSupervisorRequest = require('../../validation/cosupervisor');
const CoSupervisor = require('../../models/coSupervisor');


router.post('/cosupervisorRequest', (req, res) => {
    const { errors, isValid } = validateCoSupervisorRequest(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    CoSupervisor.findOne({ coSupervisorname: req.body.coSupervisorname }).then(coSupervisor => {
        if (coSupervisor) {
            return res.status(400).json({ name: 'This Co-Supervisor already acllocated to a group' });
        } else {
            const newCoSupervisor = new CoSupervisor({
                coSupervisorname: req.body.coSupervisorname,
                supervisorname: req.body.supervisorname,
                groupname: req.body.groupname,
                topic: req.body.topic
            });
            newCoSupervisor
                .save()
                .then(coSupervisor => {
                    return res.status(200).json({ message: 'Your Co-Supervisor was requested successfully.' })
                }).catch(err => console.log(err));
        }
    });
});

module.exports = router;
