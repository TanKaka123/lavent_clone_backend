const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant-controller');

router.route('/create-restaurant').post(restaurantController.create);
router.route('/read-restaurant').get(restaurantController.findAll);
router.route('/read-restaurant/:restaurantId').get(restaurantController.findById);
router.route('/update-restaurant/:restaurantId').put(restaurantController.updateById);
router.route('/delete-restaurant/:restaurantId').patch(restaurantController.deleteById);

module.exports = router;