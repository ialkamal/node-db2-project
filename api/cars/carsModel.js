const db = require("../../data/knexConfig");

async function getCars() {
  const cars = await db("cars");
  return cars;
}

async function insertCar(car) {
  const [id] = await db("cars").insert(car);
  return id;
}

module.exports = { getCars, insertCar };
