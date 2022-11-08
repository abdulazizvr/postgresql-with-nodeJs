const { fetchAll, fetch } = require("../utils/pg.js");

module.exports = {
  GETONE: async (req, res) => {
    let { id } = req.params;
    let cars = await fetch("select * from cars where id = $1", id);
    res.send(cars);
  },
  GETALL: async (req, res) => {
    let cars = await fetchAll("select * from cars");
    res.send(cars);
  },
  POST: async (req, res) => {
    let { car_name, color, model, position, car_image, price } = req.body;
    let { id } = await fetch(
      "INSERT INTO cars (car_name,color,model,position,car_image,price)  values($1,$2,$3,$4,$5,$6) returning id",
      car_name,
      color,
      model,
      position,
      car_image,
      price
    );
    console.log(id);
    if (id) res.send("car added!");
    else res.send("error");
  },
  PUT: async (req, res) => {
    let { id } = req.params;
    let { car_name, color, model, position, car_image, price } = req.body;
    if (!car_name && !color && !model && !position && !car_image && !price)
      res.send("you must send data for update!");
    let car = await fetch("select * from cars where id = $1", id);
    if (!car) res.send("Not found car = " + id);
    let updatecar = await fetch(
      "update cars set car_name = $2, color = $3, model = $4, position = $5, car_image = $6, price = $7  where id = $1",
      id,
      car_name || car.car_name,
      color || car.color,
      model || car.model,
      position || car.position,
      car_image || car.car_image,
      price || car.price
    );
    res.send("updated car!");
  },
  DELETE: async (req, res) => {
    let { id } = req.params;
    let car = await fetch("delete from cars where id = $1 returning *", id);
    console.log(car);
    res.send(car);
  },
};
