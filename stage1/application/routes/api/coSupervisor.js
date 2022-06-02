const express = require('express');
const router = express.Router();
const validateCoSupervisorRequest = require('../../validation/cosupervisor');
const CoSupervisor = require('../../models/coSupervisor');
const cosupervisor = require('../../validation/cosupervisor');
const coSupervisor = require('../../models/coSupervisor');


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

router.post('/cosupervisor-data', (req, res) => {
    CoSupervisor.find({}).then(coSupervisor => {
        if (coSupervisor) {
            return res.status(200).send(coSupervisor);
        }
    });
});

router.post('/cosupervisor-delete', (req,res) => {
    CoSupervisor.deleteOne({_id: req.body._id}).then(coSupervisor => {
        if (coSupervisor) {
        return res.status(200).send(coSupervisor);
        }
    });
});

router.post('/cosupervisor-update', (req, res) => {
    const { errors, isValid } = validateCoSupervisorRequest(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    CoSupervisor.findOne({ _id }).then(coSupervisor => {
        if (coSupervisor) {
            let update = { 'supervisorname': req.body.supervisorname, 'groupname': req.body.groupname, 'topic': req.body.topic, 'coSupervisorname': req.body.coSupervisorname };
            CoSupervisor.updateOne({ _id: _id }, { $set: update }, function (err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update coSupervisor.' });
                } else {
                    return res.status(200).json({ message: 'coSupervisor updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now coSupervisor found to update.' });
        }
    });
});

module.exports = router;
