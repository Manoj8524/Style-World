// // import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import Signup from '../Models/signup.js';
// import Product from '../Models/product.js';
// import Customer from '../Models/customer.js';
// const saltRounds = 10;

// const verifyJWT = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     res.send('We need a token, please give us next time');
//   } else {
//     jwt.verify(token, 'jwt-Secret-key', (err, decoded) => {
//       if (err) {
//         res.json({ auth: false, message: 'Failed to authenticate' });
//       } else {
//         next();
//       }
//     });
//   }
// };

// const createAccount = asyncHandler(async (req, res) => {
//   const { username, email, password, address, mobile } = req.body;
//   try {
//     console.log(req.body);
//     const hash = await bcrypt.hash(password, saltRounds);
//     const userdata = new Signup({
//       name: username,
//       email: email,
//       password: hash,
//       address: address,
//       mobile: mobile,
//     });
//     await userdata.save();
//     res.json({
//       status: 200,
//       message: 'Account Created Successfully',
//     });
//   } catch (error) {
//     console.error('Error creating account:', error);
//     res.status(500).json({
//       status: 500,
//       message: 'Internal Server Error',
//     });
//   }
// });

// const userLogin = asyncHandler(async (req, res) => {
//   const { email, password } = req.query;
//   console.log(req.query);
//   const user = await Signup.find({ email: email });
//   console.log(user);
//   if (user.length) {
//     bcrypt.compare(password, user[0].password, (error, response) => {
//       if (response) {
//         const id = user[0]._id;
//         const token = jwt.sign({ id }, 'jwt-Secret-key', {
//           expiresIn: '1d', // 1 day
//         });
//         res.cookie('token', token);
//         return res.json({ auth: true, token: token, result: user });
//       } else {
//         return res.send({
//           message: 'Wrong username/password combination!',
//         });
//       }
//     });
//   } else {
//     res.send({ auth: false, message: 'No user exists.' });
//   }
// });

// const addProduct = asyncHandler(async (req, res) => {
//   const { name, price, category, stock } = req.body;

//   const productdetails = new Product({
//     name: name,
//     price: price,
//     category: category,
//     stock: stock,
//   });
//   await productdetails.save();
//   res.json({
//     status: 200,
//     message: 'Product Added Successfully',
//   });
// });

// const addCustomer = asyncHandler(async (req, res) => {
//   const {
//     name,
//     mobile,
//     service,
//     amount,
//     paymentmethod,
//     productname,
//     productamount,
//     productquantity,
//     customerfeedback,
//   } = req.body;

//   const productdetails = new Customer({
//     name: name,
//     mobile: mobile,
//     service: service,
//     amount: amount,
//     paymentmethod: paymentmethod,
//     productname: productname,
//     productamount: productamount,
//     productquantity: productquantity,
//     customerfeedback: customerfeedback,
//   });
//   await productdetails.save();
//   res.json({
//     status: 200,
//     message: 'Customer Added Successfully',
//   });
// });

// const updateBooking = asyncHandler(async (req, res) => {
//   const {
//     id,
//     name,
//     mobile,
//     service,
//     amount,
//     paymentmethod,
//     productname,
//     productamount,
//     productquantity,
//     customerfeedback,
//   } = req.body;

//   await Customer.updateOne(
//     { _id: id },
//     {
//       $set: {
//         name: name,
//         mobile: mobile,
//         service: service,
//         amount: amount,
//         paymentmethod: paymentmethod,
//         productname: productname,
//         productamount: productamount,
//         productquantity: productquantity,
//         customerfeedback: customerfeedback,
//       },
//     }
//   );
//   res.json({ status: 200, message: 'Booking Updated Successfully' });
// });

// const getAllProducts = asyncHandler(async (req, res) => {
//   console.log('hi');
//   const productData = await Product.find({});
//   console.log(productData);
//   res.status(200).send(productData);
// });

// const getTodayBooking = asyncHandler(async (req, res) => {
//   const startOfDay = new Date();
//   startOfDay.setHours(0, 0, 0, 0);
//   const endOfDay = new Date();
//   endOfDay.setHours(23, 59, 59, 999);

//   const productData = await Customer.find({
//     createdAt: { $gte: startOfDay, $lte: endOfDay },
//   });
//   console.log(productData);
//   res.status(200).send(productData);
// });

// const getBookings = asyncHandler(async (req, res) => {
//   const productData = await Customer.find({});
//   console.log(productData);
//   res.status(200).send(productData);
// });

// const updateProduct = asyncHandler(async (req, res) => {
//   const { id, name, price, category, stock } = req.body;
//   await Product.updateOne(
//     { _id: id },
//     {
//       $set: {
//         name: name,
//         price: price,
//         category: category,
//         stock: stock,
//       },
//     }
//   );
//   res.json({ status: 200, message: 'Product Updated Successfully' });
// });

// const updateStockCount = asyncHandler(async (req, res) => {
//   const { id, count, quantity } = req.body;
//   console.log(req.body);
//   var f_count = count - quantity;
//   await Product.updateOne(
//     { _id: id },
//     {
//       $set: {
//         stock: f_count,
//       },
//     }
//   );
//   res.json({ status: 200, message: 'Product Updated Successfully' });
// });

// const deleteproduct = asyncHandler(async (req, res) => {
//   const { id } = req.query;
//   console.log(req.query);
//   await Product.deleteOne({ _id: id });
//   res.json({ status: 200 });
// });

// const deletebooking = asyncHandler(async (req, res) => {
//   const { id } = req.query;
//   console.log(req.query);
//   await Customer.deleteOne({ _id: id });
//   res.json({ status: 200 });
// });

// // Monthly income calculation
// const getMonthlyIncome = asyncHandler(async (req, res) => {
//   try {
//     const currentMonth = new Date().getMonth();
//     const currentYear = new Date().getFullYear();

//     const customers = await Customer.find({
//       createdAt: {
//         $gte: new Date(currentYear, currentMonth, 1),
//         $lt: new Date(currentYear, currentMonth + 1, 1),
//       },
//     });

//     const totalAmount = customers.reduce((sum, customer) => {
//       return sum + parseFloat(customer.amount || 0);
//     }, 0);

//     res.status(200).json({ totalAmount });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// });

// // Yearly income calculation
// const getYearlyIncome = asyncHandler(async (req, res) => {
//   try {
//     const currentYear = new Date().getFullYear();

//     const customers = await Customer.find({
//       createdAt: {
//         $gte: new Date(currentYear, 0, 1),
//         $lt: new Date(currentYear + 1, 0, 1),
//       },
//     });

//     const totalAmount = customers.reduce((sum, customer) => {
//       return sum + parseFloat(customer.amount || 0);
//     }, 0);

//     res.status(200).json({ totalAmount });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// });

// export {
//   createAccount,
//   verifyJWT,
//   userLogin,
//   addProduct,
//   getAllProducts,
//   updateProduct,
//   deleteproduct,
//   addCustomer,
//   getTodayBooking,
//   getBookings,
//   deletebooking,
//   updateBooking,
//   updateStockCount,
//   getMonthlyIncome,
//   getYearlyIncome,
// };
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Signup from '../Models/signup.js';
import Product from '../Models/product.js';
import Customer from '../Models/customer.js';
import product from '../Models/product.js';
const saltRounds = 10;

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.send('We need a token, please give us next time');
  } else {
    jwt.verify(token, 'jwt-Secret-key', (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: 'Failed to authenticate' });
      } else {
        next();
      }
    });
  }
};

const createAccount = asyncHandler(async (req, res) => {
  const { username, email, password, address, mobile } = req.body;
  try {
    console.log(req.body);
    const hash = await bcrypt.hash(password, saltRounds);
    const userdata = new Signup({
      name: username,
      email: email,
      password: hash,
      address: address,
      mobile: mobile,
    });
    await userdata.save();
    res.json({
      status: 200,
      message: 'Account Created Successfully',
    });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.query;
  console.log(req.query);
  const user = await Signup.find({ email: email });
  console.log(user);
  if (user.length) {
    bcrypt.compare(password, user[0].password, (error, response) => {
      if (response) {
        const id = user[0]._id;
        const token = jwt.sign({ id }, 'jwt-Secret-key', {
          expiresIn: '1d', // 1 day
        });
        res.cookie('token', token);
        return res.json({ auth: true, token: token, result: user });
      } else {
        return res.send({
          message: 'Wrong username/password combination!',
        });
      }
    });
  } else {
    res.send({ auth: false, message: 'No user exists.' });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const { name, price, category, stock } = req.body;

  const productdetails = new Product({
    name: name,
    price: price,
    category: category,
    stock: stock,
  });
  await productdetails.save();
  res.json({
    status: 200,
    message: 'Product Added Successfully',
  });
});

const addCustomer = asyncHandler(async (req, res) => {
  const {
    name,
    mobile,
    service,
    amount,
    paymentmethod,
    productname,
    productamount,
    productquantity,
    customerfeedback,
  } = req.body;
  let today = new Date().toISOString().slice(0, 10);
  const productdetails = new Customer({
    name: name,
    mobile: mobile,
    service: service,
    amount: amount,
    paymentmethod: paymentmethod,
    productname: productname,
    productamount: productamount,
    productquantity: productquantity,
    customerfeedback: customerfeedback,
    currentdate: today
  });
  await productdetails.save();
  res.json({
    status: 200,
    message: 'Customer Added Successfully',
  });
});

const updateBooking = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    mobile,
    service,
    amount,
    paymentmethod,
    productname,
    productamount,
    productquantity,
    customerfeedback,
  } = req.body;
  let today = new Date().toISOString().slice(0, 10);

  await Customer.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        mobile: mobile,
        service: service,
        amount: amount,
        paymentmethod: paymentmethod,
        productname: productname,
        productamount: productamount,
        productquantity: productquantity,
        customerfeedback: customerfeedback,
        currentdate: today
      },
    }
  );
  res.json({ status: 200, message: 'Booking Updated Successfully' });
});

const getAllProducts = asyncHandler(async (req, res) => {
  console.log('hi');
  const productData = await Product.find({}).sort({ _id: -1 });
  console.log(productData);
  res.status(200).send(productData);
});

const getTodayBooking = asyncHandler(async (req, res) => {
  let today = new Date().toISOString().slice(0, 10);
  const productData = await Customer.find({ currentdate: today });
  console.log(productData);
  res.status(200).send(productData);
});

const getBookings = asyncHandler(async (req, res) => {
  const productData = await Customer.find({}).sort({ _id: -1 });
  console.log(productData);
  res.status(200).send(productData);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id, name, price, category, stock } = req.body;
  await Product.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        price: price,
        category: category,
        stock: stock,
      },
    }
  );
  res.json({ status: 200, message: 'Product Updated Successfully' });
});

const updateStockCount = asyncHandler(async (req, res) => {
  const { id, count, quantity } = req.body;
  console.log(req.body);

  var f_count = count - quantity;  // Subtract the product quantity from the current stock count

  try {
    await product.updateOne(
      { _id: id },
      { $set: { stock: f_count } }
    );

    res.json({ status: 200, message: 'Product Updated Successfully' });
  } catch (error) {
    console.error("Error updating stock", error);
    res.status(500).json({ status: 500, message: 'Error updating stock' });
  }
});

const deleteproduct = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  await Product.deleteOne({ _id: id });
  res.json({ status: 200 });
});

const deletebooking = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  await Customer.deleteOne({ _id: id });
  res.json({ status: 200 });
});

// Monthly income calculation
const getMonthlyIncome = asyncHandler(async (req, res) => {
  try {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const customers = await Customer.find({
      createdAt: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });

    const totalAmount = customers.reduce((sum, customer) => {
      return sum + parseFloat(customer.amount || 0);
    }, 0);

    res.status(200).json({ totalAmount });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Yearly income calculation
const getYearlyIncome = asyncHandler(async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const customers = await Customer.find({
      createdAt: {
        $gte: new Date(currentYear, 0, 1),
        $lt: new Date(currentYear + 1, 0, 1),
      },
    });

    const totalAmount = customers.reduce((sum, customer) => {
      return sum + parseFloat(customer.amount || 0);
    }, 0);

    res.status(200).json({ totalAmount });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

export {
  createAccount,
  verifyJWT,
  userLogin,
  addProduct,
  getAllProducts,
  updateProduct,
  deleteproduct,
  addCustomer,
  getTodayBooking,
  getBookings,
  deletebooking,
  updateBooking,
  updateStockCount,
  getMonthlyIncome,
  getYearlyIncome,
};
