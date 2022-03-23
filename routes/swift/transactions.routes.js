const {Types,} = require('mongoose')


const router = require("express").Router();
const { User } = require("../../models/user.model");

// get all transactions
router.get("/", async (req, res) => {
  const userData = req.user;
  const user = await User.findById(userData.id);
  res.json({ transactions: user.transactions });
});
// insert transaction
router.post("/", async (req, res) => {
  const user = await User.findById(req.user.id);

  const { type, fromId, toId, amount, note } = req.body;

  // update branches based on transaction
  const from = user.branches.find((b) => b._id == fromId);
  if (!from) return res.status(404).json({ msg: "From Branch Not Found" });

  let to;

  if (type === "transfer") {
    to = user.branches.find((b) => b._id == toId);
    if (!to) return res.status(404).json({ msg: "To Branch Not Found" });
  } else {
    to = from;
  }

  const amountSign = type == "income" ? 1 : -1;

  // balance: 500
  // sign: -1
  // amount: 100

  // balance = 500 + (100 * -1) = 500 + (-100) = 500 - 100 = 400

  // /====

  // balance: 500
  // sign: +1
  // amount: 100

  // balance = 500 + (100 * +1) = 500 + (+100) = 500 + 100 = 600

  from.balance += Number(amount) * amountSign;

  if (type === "transfer") {
    to.balance += Number(amount);
  }

  // insert transactions
  const transaction = {
    _id: new Types.ObjectId(),
    type,
    from: {
      id: from._id,
      name: from.name,
    },
    to: {
      id: to._id,
      name: to.name,
    },
    amount: Number(amount),
    note,
    createdAt: new Date()
  };

  user.transactions.push(transaction);

  await user.save();

  res.json({ transaction });
});

// get branch transactions
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user.id);

  const transactions = user.transactions.filter(
    (trans) => trans.from.id == id || trans.to.id == id
  );

  res.json({ transactions });
});

// delete transaction
router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.user.id);
  const { id } = req.params;

  const transactionIndex = user.transactions.findIndex(
    (trans) => trans._id == id
  );

  if (transactionIndex == -1)
    return res.status(404).json({ msg: "Transaction Not Found" });

  const { type, from, to, amount } = user.transactions[transactionIndex];

  const fromBranch = user.branches.find((branch) => branch._id == from.id);

  const amountSign = type === "income" ? -1 : 1;

  // balance: 400

  // amount: 100
  // sign: 1

  // balance = 400 + (1 * 100) = 400 + (100) = 400 + 100 = 500

  fromBranch.balance += amount * amountSign;

  if (type === 'transfer') {
      const toBranch = user.branches.find(branch => branch._id == to.id)
      
      toBranch.balance -= amount
  }

  user.transactions.splice(transactionIndex, 1)

  await user.save();

  res.json({
      branches: user.branches,
      transactions: user.transactions 
  })


});
module.exports = router;
