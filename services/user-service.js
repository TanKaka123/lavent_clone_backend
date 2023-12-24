import userModel from "../models";

const user = userModel;

export const createUser = function (data, callback) {
  user.create(data).then(
    (response) => {
      callback(null, response);
    },
    (error) => {
      callback(error, null);
    }
  );
};

export const findByEmail = function (query, callback) {
  return user.findOne(query).exec();
};

export const updateUserById = function (id, data, callback) {
  user.findByIdAndUpdate(
    {
      _id: id,
    },
    data,
    (err, response) => {
      callback(err, response);
    }
  );
};

export const updateUser = function (query, data, options, callback) {
  user.findOneAndUpdate(query, data, options, (err, response) => {
    callback(err, response);
  });
};

export const deleteUser = function (query, callback) {
  user.deleteOne(query, callback);
};

export const findUserById = function (userId, callback) {
  user.findById(userId, callback);
};
