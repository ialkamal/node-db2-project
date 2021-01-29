const express = require("express");
const router = express.Router();

const { getCars, insertCar } = require("./carsModel");

router.get("/", async (req, res, next) => {
  try {
    const cars = await getCars();
    res.status(200).json(cars);
  } catch (err) {
    err.message = "can't get list of cars form the server.";
    err.statusCode = 500;
    next(err);
  }
});

router.post("/", checkPayload, async (req, res, next) => {
  const newCar = req.car;
  try {
    const id = await insertCar(newCar);
    res
      .status(200)
      .json({
        id,
        ...newCar,
        transmissionType: newCar.transmissionType || null,
        titleStatus: newCar.titleStatus || null,
      });
  } catch (err) {
    err.message = "can't post a car to the server.";
    err.statusCode = 500;
    next(err);
  }
});

function checkPayload(req, res, next) {
  const body = req.body;
  if (!body.VIN || !body.make || !body.model || !body.mileage) {
    err = new Error();
    err.message = "You must enter a VIN, make, model or mileage of the car.";
    err.statusCode = 400;
    next(err);
  } else if (!Number(body.VIN)) {
    err = new Error();
    err.message = "VIN must be a number";
    err.statusCode = 400;
    next(err);
  } else if (!Number(body.mileage)) {
    err = new Error();
    err.message = "Mileage must be a number";
    err.statusCode = 400;
    next(err);
  } else {
    req.car = body;
    next();
  }
}

module.exports = router;
