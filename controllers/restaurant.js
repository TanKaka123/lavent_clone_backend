import {
  createRestaurant,
  findAllRestaurants,
  findRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
} from "../services/restaurant-service.js";
import { restaurantModel } from "../models/restaurant.js";

export const create = function (req, res, next) {
  const body = new restaurantModel(req.body);

  const callbackService = (error, response) => {
    if (response) {
      res.status(201).send(response);
    } else if (error) {
      res.status(400).send(error);
    }
  };
  createRestaurant(body, callbackService);
};

export const findAll = async (req, res) => {
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

  findAllRestaurants(callbackService);
};

export const findById = function (req, res) {
  const restaurantId = req.params.restaurantId;
  if (!restaurantId) {
    res.status(400).send("Restaurant ID is required");
    return;
  }

  const callbackService = (error, response) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    if (response) {
      res.status(200).send(response);
      return;
    }
    res.status(404).send("Restaurant not found");
  };

  findRestaurantById(restaurantId, callbackService);
};

export const updateById = function (req, res) {
  const restaurantId = req.params.id;

  if (!restaurantId) {
    res.status(400).send("Restaurant ID is required");
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
  updateRestaurantById(
    restaurantId,
    updateData,
    callbackService
  );
};

export const deleteById = function (req, res) {
  const restaurantId = req.params.id;

  if (!restaurantId) {
    res.status(400).send("Post ID is required");
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

  deleteRestaurantById(restaurantId, callbackService);
};
