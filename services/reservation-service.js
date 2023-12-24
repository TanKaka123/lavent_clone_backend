import reservationModel from "../models/reservation.js";

const reservation = reservationModel;

export const createReservation = function (data, callback) {
  reservation.create(data).then(
    (response) => {
      callback(null, response);
    },
    (error) => {
      callback(error, null);
    }
  );
};

export const findAllReservation = function (callback) {
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

export const findReservationById = function (restaurantId, callback) {
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

export const updateReservationById = function (id, data, callback) {
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

export const deleteReservationById = function (id, callback) {
  reservation.findByIdAndDelete(
    {
      _id: id,
    },
    (err, response) => {
      callback(err, response);
    }
  );
};
