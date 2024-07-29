// File: app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ai_tools_hub', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema for AI tools
const toolSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String
});

const Tool = mongoose.model('Tool', toolSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

// API routes
app.get('/api/tools', async (req, res) => {
  const tools = await Tool.find();
  res.json(tools);
});

app.post('/api/tools', async (req, res) => {
  const tool = new Tool(req.body);
  await tool.save();
  res.status(201).json(tool);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
