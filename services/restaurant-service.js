import restaurantModel from "../models";

const restaurant = restaurantModel;

export const createRestaurant = function (data, callback) {
  restaurant.create(data).then(
    (response) => {
      callback(null, response);
    },
    (error) => {
      callback(error, null);
    }
  );
};

export const findAllRestaurants = function (callback) {
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

export const findRestaurantById = function (restaurantId, callback) {
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

export const updateRestaurantById = function (id, data, callback) {
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

export const deleteRestaurantById = function (id, callback) {
  restaurant.findByIdAndDelete(
    {
      _id: id,
    },
    (err, response) => {
      callback(err, response);
    }
  );
};
