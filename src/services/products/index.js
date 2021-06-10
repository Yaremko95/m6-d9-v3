import express from "express";
import { Product, Category } from "../../db/index.js";
import sequelize from "../../db/index.js";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({ include: Category });
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  });

router.route("/sortByCategory").get(async (req, res, next) => {
  try {
    //   select "categoryId", count(*)  from products
    // group by ("categoryId")
    const data = await Product.findAll({
      include: Category,
      attributes: [
        "categoryId",
        [sequelize.fn("count", "id"), "total_products"],
      ],
      group: ["categoryId", "category.id"],
      order: ["total_products", "DESC"],
    });
    res.send(data);
  } catch (error) {
    console.log(error);
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
    } catch (e) {
      console.log(e);
    }
  });

export default router;
