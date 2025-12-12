const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());


const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  date: { type: String, required: true },
  payment: { type: String },
  notes: { type: String }
});

// 1. Database Connection
mongoose
  .connect("mongodb+srv://nagumeenaudayappan23aid_db_user:meena5002@cluster0.iqa8w0g.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const Expense = mongoose.model("Expense", ExpenseSchema);

// 2. Add Expense API
app.post("/add", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.json({ message: "Expense Added Successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get All Expenses API
app.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Run Server
app.listen(5000, () => console.log("Server running on port 5000"));
