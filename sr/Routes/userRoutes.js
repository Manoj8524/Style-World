import express from "express";
import {
  createAccount,
  deletebooking,
  getBookings,
  getTodayBooking,
  updateBooking,
  updateStockCount,
  userLogin
} from "../Controllers/userController.js";
import { addProduct } from "../Controllers/userController.js";
import { getAllProducts } from "../Controllers/userController.js";
import { updateProduct } from "../Controllers/userController.js";
import { deleteproduct } from "../Controllers/userController.js";
import { addCustomer } from "../Controllers/userController.js";
import { getMonthlyIncome } from "../Controllers/userController.js";
import { getYearlyIncome } from "../Controllers/userController.js";

const router = express.Router();
router.post("/createaccount", createAccount);
router.post("/addproduct", addProduct);
router.post("/addcustomer", addCustomer);

router.get("/userlogin", userLogin);
router.get("/getbookings", getBookings);
router.get("/getproducts", getAllProducts);
router.get("/gettodaybooking", getTodayBooking);
router.get('/income/monthly', getMonthlyIncome);
router.get('/income/yearly', getYearlyIncome);

router.put("/editproduct", updateProduct);
router.put("/editbooking", updateBooking);
router.put("/editstock", updateStockCount);

router.delete("/deleteproduct", deleteproduct);
router.delete("/deletecustomerbooking", deletebooking);

export default router;
