const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE
router.post("/", auth, async (req, res) => {
  const expense = new Expense({
    userId: req.userId,
    amount: req.body.amount,
    category: req.body.category,
    note: req.body.note,
      date: req.body.date,
  });

  await expense.save();
  res.json(expense);
});

// READ
router.get("/", auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.userId });
  res.json(expenses);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(
    req.params.id,
    {
      amount: req.body.amount,
      category: req.body.category,
      note: req.body.note,
    },
    { new: true }
  );

  res.json(updated);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted" });
});



module.exports = router;
