const express = require('express');
const router = express.Router();
const validateMarkingInput = require('../../validation/marking');
const Marking = require('../../models/Marking');

router.post('/marking-add', (req, res) => {
    const { errors, isValid } = validateMarkingInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Marking.findOne({ name: req.body.type }).then(marking => {
        if (marking) {
            return res.status(400).json({ name: 'Marking Sheet already exists' });
        } else {
            const newMarking = new Marking({
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
                criticalAnalysis: req.body.criticalAnalysis,
                concept: req.body.concept,
                scope: req.body.scope,
                technicalAccuracy: req.body.technicalAccuracy,
                theory: req.body.theory,
                referencing: req.body.referencing,
                presentation: req.body.presentation
            });
            newMarking
                .save()
                .then(marking => {
                    return res.status(200).json({ message: 'Marking Sheet added successfully. Refreshing data...' })
                }).catch(err => console.log(err));
        }
    });
});

router.post('/marking-data', (req, res) => {
    Marking.find({}).then(marking => {
        if (marking) {
            return res.status(200).send(marking);
        }
    });
});

router.post('/marking-delete', (req, res) => {
    Marking.deleteOne({ _id: req.body._id }).then(marking => {
        if (marking) {
            return res.status(200).json({ message: 'Marking Sheet deleted successfully. Refreshing data...', success: true })
        }
    });
});

router.post('/marking-update', (req, res) => {
    const { errors, isValid } = validateMarkingInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    Marking.findOne({ _id }).then(marking => {
        if (marking) {
            let update = { 'name': req.body.name, 'type': req.body.type, 'description': req.body.description, "criticalAnalysis": req.body.criticalAnalysis, 
        "concept": req.body.concept, "scope": req.body.scope, "technicalAccuracy": req.body.technicalAccuracy, "theory": req.body.theory, "referencing": req.body.referencing,
    "presentation": req.body.presentation};
            Marking.update({ _id: _id }, { $set: update }, function (err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update Marking Sheet.' });
                } else {
                    return res.status(200).json({ message: 'Marking Sheet updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Marking found to update.' });
        }
    });
});

module.exports = router;
