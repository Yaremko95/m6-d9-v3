import express from "express";
import { Cart, User, Product, Category } from "../../db/index.js";
import sequelize from "../../db/index.js";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Cart.findAll();
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Cart.create(req.body);
      res.send("ok");
    } catch (e) {
      console.log(e);
    }
  });
router.route("/:userId/user").get(async (req, res, next) => {
  try {
    //v1
    //   SELECT "productId", "userId", count(id)
    // FROM public.carts where "userId"=1
    // group by "productId", "userId"

    //v2
    //   SELECT c."productId", c."userId", p.name, p.price,count(c.id) as unitary_qty, sum(p.price) as unitary_price
    // FROM public.carts as c
    // inner join products as p
    // on c."productId"=p.id
    // where c."userId"=1
    // group by "productId", "userId",  p.name, p.price

    const data = await Cart.findAll({
      where: { userId: req.params.userId },
      include: { model: Product, include: Category },
      attributes: [
        "productId",
        "userId",
        [sequelize.fn("count", "id"), "unitary_qty"],
        [sequelize.fn("sum", sequelize.col("product.price")), "unitary_price"],
      ],
      group: ["productId", "userId", "product.id", "product.category.id"],
    });

    // select count(*) from carts where "userId"=1

    const totalQty = await Cart.count({ where: { userId: req.params.userId } });

    // select  sum(p.price)
    // from carts as c
    // inner join products as p
    // on p.id=c."productId"

    // where "userId"=1

    const totalPrice = await Cart.sum("product.price", {
      where: { userId: req.params.userId },
      include: { model: Product, attributes: [] },
    });

    res.send({ data, totalQty, totalPrice });
  } catch (e) {
    console.log(e);
  }
});
router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
    } catch (e) {
      console.log(e);
    }
  })
  .put(async (req, res, next) => {
    try {
    } catch (e) {
      console.log(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const row = await Cart.destroy({ where: { id: req.params.id } });
      if (row > 0) {
        res.send("ok");
      } else {
        res.status(404).send("Not found");
      }
    } catch (e) {
      console.log(e);
    }
  });

export default router;
