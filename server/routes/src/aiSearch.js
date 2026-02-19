// server/routes/aiSearch.js
import express from "express";
import OpenAI from "openai";
import Product from "../models/Product.js"; // import your Product model

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Cosine similarity helper
const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (normA * normB);
};

router.post("/search-ai", async (req, res) => {
  const { query } = req.body;

  try {
    // Generate embedding for the search query
    const embeddingResponse = await client.embeddings.create({
      model: "text-embedding-ada-002",
      input: query,
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;

    // Fetch products with stored embeddings from DB
    const products = await Product.find({ embedding: { $exists: true } });

    // Compare query embedding with product embeddings
    const results = products
      .map((p) => ({
        ...p.toObject(),
        score: cosineSimilarity(queryEmbedding, p.embedding),
      }))
      .sort((a, b) => b.score - a.score);

    res.json({ results: results.slice(0, 10) }); // return top 10
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI search failed." });
  }
});

export default router;


