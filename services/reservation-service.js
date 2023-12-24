const { reservationModel } = require("../models"); 

(function () {
  const reservation = reservationModel;

  exports.createReservation = function (data, callback) {
    reservation.create(data).then(
      (response) => {
        callback(null, response);
      },
      (error) => {
        callback(error, null);
      }
    );
  };

  exports.findAllReservation= function (callback) {
    reservation
      .find()
      .lean()
      .populate({
        path: "restaurant",
        model: "Restaurant",
        select: "title",
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

  exports.findReservationById = function (restaurantId, callback) {
    reservation
      .findById(restaurantId)
      .lean()
      .populate({
        path: "restaurant",
        model: "Restaurant",
        select: "title",
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
  

  exports.updateReservationById = function (id, data, callback) {
    reservation.findByIdAndUpdate(
      {
        _id: id,
      },
      data,
      (err, response) => {
        callback(err, response);
      }
    );
  };

  exports.deleteReservationById = function (id, callback) {
    reservation.findByIdAndDelete(
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
