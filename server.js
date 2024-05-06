// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { check, validationResult } from 'express-validator';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mealsDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the meals
const mealSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  price: Number
});

// Create a model for the meals
const Meal = mongoose.model('Meal', mealSchema);

// Create an instance of express
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Validation rules for POST and PUT requests
const mealValidationRules = [
  check('name').isLength({ min: 1 }).withMessage('Name is required'),
  check('price').isNumeric().withMessage('Price must be a number')
];

// GET request to /api/meals
app.get('/api/meals', async (req, res) => {
  const meals = await Meal.find();
  res.json(meals);
});

// POST request to /api/meals
app.post('/api/meals', mealValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const meal = new Meal(req.body);
  const savedMeal = await meal.save();
  res.json(savedMeal);
});

// PUT request to /api/meals/:id
app.put('/api/meals/:id', mealValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const updatedMeal = await Meal.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedMeal);
});

// DELETE request to /api/meals/:id
app.delete('/api/meals/:id', async (req, res) => {
  const { id } = req.params;
  await Meal.findByIdAndDelete(id);
  res.json({message: 'Meal deleted'});
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
