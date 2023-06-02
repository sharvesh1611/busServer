const { body } = require('express-validator');

const busValidator ={
    addNewBus:[
        body('busName').isString().trim().notEmpty().withMessage('Invalid busName'),
        body('source').isString().trim().notEmpty().withMessage('Invalid source'),
        body('destination').isString().trim().notEmpty().withMessage('Invalid destination'),
        body('departureTime').isString().trim().matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Invalid departureTime'),
        body('reachingTime').isString().trim().matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Invalid reachingTime'),
      ]

};

module.exports = { busValidator };
