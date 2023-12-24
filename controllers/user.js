import {  createUser,
  findByEmail,
  updateUserById,
  updateUser,
  deleteUser, 
} from "../services/user-service.js";
import { userModel } from "../models/users.js";

export const create = function (req, res, next) {
  const body = new userModel(req.body);

  const callbackService = (error, response) => {
    if (response) {
      res.status(201).send(response);
    } else if (error) {
      res.status(400).send(error);
    }
  };
  createUser(body, callbackService);
};

export const findByEmail = function (req, res) {
  const query = {
    email: new RegExp(req.body.email, "i"),
  };
 
  if (!query) {
    res.status(400).send("Bad Request");
    return;
  }

  const callbackService = (error, response) => {
    if (error) {
      res.status(404).send(error);
      return;
    }
    if (response) {
      res.status(200).send(response);
      return;
    }
    if (!response) {
      res.status(204).send("No Data Found");
    }
  };

  findByEmail(query)
    .then((response) => callbackService(null, response))
    .catch((error) => callbackService(error, null));
};

export const updateById = function (req, res) {
  const body = req.body;

  if (!body.id) {
    res.status(400).send("Id is missing");
    return;
  }
  const updateData = body.data || {};
  callbackService = (err, response) => {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
      res.status(400).send(err);
    }
  };
  updateUserById(body.id, updateData, callbackService);
};

export const update = function (req, res) {
  const body = req.body;
  const query = body.query;
  const data = body.data;
  const options = body.options;
  if (!query) {
    res.status(400).send("Bad request");
    return;
  }

  const callbackService = (err, response) => {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
      res.status(400).send(err);
    }
  };

  updateUser(query, data, options, callbackService);
};

export const deleteById = function (req, res) {
  const body = req.body || {};
  const query = body.query;
  if (!query) {
    res.status(400).send("Bad Request");
    return;
  }

  const callbackService = (error, response) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    if (response) {
      if (response.n === 1 && response.ok === 1) {
        res.status(202).send(body);
      }
      if (response.n === 0 && response.ok === 1) {
        res.status(204).send({
          message: "No data found",
        });
      }
    }
  };

  deleteUser(query, callbackService);
};
