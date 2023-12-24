const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation-controller');

router.route('/create-reservation').post(reservationController.create);
router.route('/read-reservation').get(reservationController.findAll);
router.route('/read-reservation/:reservationId').get(reservationController.findById);
router.route('/update-reservation/:reservationId').put(reservationController.updateById);
router.route('/delete-reservation/:reservationId').patch(reservationController.updateById);

module.exports = router;