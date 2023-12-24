const { restaurantModel } = require("../models"); 

(function () {
  const restaurant = restaurantModel;

  exports.createRestaurant = function (data, callback) {
    restaurant.create(data).then(
      (response) => {
        callback(null, response);
      },
      (error) => {
        callback(error, null);
      }
    );
  };

  exports.findAllRestaurants= function (  callback) {
    restaurant
      .find()
      .lean()
      .populate({
        path: "user",
        model: "User",
        select: "name",
      })
      .exec()
      .then((result) => {
        if (result) {
          callback(null, result);
        } else {
          callback(null, null);
        }
      })
      .catch((error) => {
        callback(error);
        return false;
      });
    return true;
  };

  exports.findRestaurantById = function (restaurantId, callback) {
    restaurant
      .findById(restaurantId)
      .lean()
      .populate({
        path: "user",
        model: "User",
        select: "name",
      })
      .exec()
      .then((result) => {
        if (result) {
          callback(null, result);
        } else {
          callback(null, null);
        }
      })
      .catch((error) => {
        callback(error);
        return false;
      });
    return true;
  };
  

  exports.updateRestaurantById = function (id, data, callback) {
    restaurant.findByIdAndUpdate(
      {
        _id: id,
      },
      data,
      (err, response) => {
        callback(err, response);
      }
    );
  };

  exports.deleteRestaurantById = function (id, callback) {
    restaurant.findByIdAndDelete(
      {
        _id: id,
      },
      data,
      (err, response) => {
        callback(err, response);
      }
    );
  };

})();
