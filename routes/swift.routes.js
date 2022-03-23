const router = require('express').Router();

const branchesRoutes = require('./swift/branches.routes')
const transactionsRoutes = require('./swift/transactions.routes')
const {
  ValidateToken,
} = require("../middleware/validate/validateToken.middleware.js");


// /swift/branches
router.use("/branches", ValidateToken , branchesRoutes);

// /swift/transaction
router.use('/transaction', ValidateToken, transactionsRoutes);

module.exports = router;