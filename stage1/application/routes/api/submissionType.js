const express = require('express');
const router = express.Router();
const validateSubmissionTypeInput = require('../../validation/submissionType');
const SubmissionType = require('../../models/SubmissionType');

router.post('/submissionType-add', (req, res) => {
    const { errors, isValid } = validateSubmissionTypeInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    SubmissionType.findOne({ name: req.body.name }).then(submissionType => {
        if (submissionType) {
            return res.status(400).json({ name: 'Submission Type already exists' });
        } else {
            const newSubmissionType = new SubmissionType({
                name: req.body.name,
                description: req.body.description
            });
            newSubmissionType
                .save()
                .then(submissionType => {
                    return res.status(200).json({ message: 'Submission Type added successfully. Refreshing data...' })
                }).catch(err => console.log(err));
        }
    });
});

router.post('/submissionType-data', (req, res) => {
    SubmissionType.find({}).then(submissionType => {
        if (submissionType) {
            return res.status(200).send(submissionType);
        }
    });
});

router.post('/submissionType-delete', (req, res) => {
    SubmissionType.deleteOne({ _id: req.body._id }).then(submissionType => {
        if (submissionType) {
            return res.status(200).json({ message: 'Submission Type deleted successfully. Refreshing data...', success: true })
        }
    });
});

router.post('/submissionType-update', (req, res) => {
    const { errors, isValid } = validateSubmissionTypeInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const _id = req.body._id;
    SubmissionType.findOne({ _id }).then(submissionType => {
        if (submissionType) {
            let update = { 'name': req.body.name, 'description': req.body.description};
            SubmissionType.update({ _id: _id }, { $set: update }, function (err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update Submission Type.' });
                } else {
                    return res.status(200).json({ message: 'Submission Type updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'No Submission Type found to update.' });
        }
    });
});

module.exports = router;
