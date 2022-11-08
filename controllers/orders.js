const { fetchAll, fetch } = require("../utils/pg.js");

module.exports = {
  GETONE: async (req, res) => {
    let { id } = req.params;
    let orders = await fetch("select * from orders where id = $1", id);
    res.send(orders);
  },
  GETALL: async (req, res) => {
    let orders = await fetchAll("select * from orders");
    res.send(orders);
  },
  POST: async (req, res) => {
    let {  } = req.body;
    let { id } = await fetch(
      "INSERT INTO orders (order_name,color,model,position,order_image,price)  values($1,$2,$3,$4,$5,$6) returning id",
      order_name,
      color,
      model,
      position,
      order_image,
      price
    );
    console.log(id);
    if (id) res.send("order added!");
    else res.send("error");
  },
  PUT: async (req, res) => {
    let { id } = req.params;
    let { order_name, color, model, position, order_image, price } = req.body;
    if (!order_name && !color && !model && !position && !order_image && !price)
      res.send("you must send data for update!");
    let order = await fetch("select * from orders where id = $1", id);
    if (!order) res.send("Not found order = " + id);
    let updateorder = await fetch(
      "update orders set order_name = $2, color = $3, model = $4, position = $5, order_image = $6, price = $7  where id = $1",
      id,
      order_name || order.order_name,
      color || order.color,
      model || order.model,
      position || order.position,
      order_image || order.order_image,
      price || order.price
    );
    res.send("updated order!");
  },
  DELETE: async (req, res) => {
    let { id } = req.params;
    let order = await fetch("delete from orders where id = $1 returning *", id);
    console.log(order);
    res.send(order);
  },
};
