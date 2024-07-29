// File: init-db.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ai_tools_hub', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema for AI tools
const toolSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String
});

const Tool = mongoose.model('Tool', toolSchema);

// Sample data based on the original HTML content
const sampleTools = [
  {
    name: "GPT-3",
    category: "Natural Language Processing",
    description: "Advanced language model for text generation and understanding."
  },
  {
    name: "DALL-E",
    category: "Image Generation",
    description: "AI system that creates images from textual descriptions."
  },
  {
    name: "AlphaFold",
    category: "Protein Folding",
    description: "AI for predicting 3D protein structures from amino acid sequences."
  },
  {
    name: "TensorFlow",
    category: "Machine Learning Framework",
    description: "Open-source library for machine learning and artificial intelligence."
  }
];

// Function to initialize the database
async function initDB() {
  try {
    // Clear existing data
    await Tool.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    const result = await Tool.insertMany(sampleTools);
    console.log(`Inserted ${result.length} sample tools`);

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error initializing database:', error);
    mongoose.connection.close();
  }
}

// Run the initialization
initDB();
