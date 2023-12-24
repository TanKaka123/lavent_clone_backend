const reservationService = require("../services/reservation-service");
const { reservationModel } = require("../models");

exports.create = function (req, res, next) {
  const body = new reservationModel(req.body);

  const callbackService = (error, response) => {
    if (response) {
      res.status(201).send(response);
    } else if (error) {
      res.status(400).send(error);
    }
  };
  reservationService.createReservation(body, callbackService);
};

exports.findAll = async (req, res) => { 
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

  reservationService.findAllReservation(  callbackService);
};

exports.findById = function (req, res) {
  const reservationId = req.params.reservationId;
  if (!reservationId) {
    res.status(400).send("Post ID is required");
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
    res.status(404).send("Post not found");
  };

  reservationService.findReservationById(reservationId, callbackService);
};

exports.updateById = function (req, res) {
  const reservationId = req.params.reservationId;

  if (!reservationId) {
    res.status(400).send("Post ID is required");
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
  reservationService.updateReservationById(reservationId, updateData, callbackService);
};

exports.deleteById = function (req, res) {
  const reservationId = req.params.reservationId;

  if (!reservationId) {
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

  reservationService.deleteReservationById(reservationId, callbackService);
};
