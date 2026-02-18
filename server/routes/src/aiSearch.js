// server/routes/aiSearch.js
import express from "express";
import OpenAI from "openai";

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Example: AI-powered semantic search
router.post("/search-ai", async (req, res) => {
  const { query, products } = req.body; // products passed from frontend

  try {
    // Generate embedding for the search query
    const embeddingResponse = await client.embeddings.create({
      model: "text-embedding-ada-002",
      input: query,
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;

    // Simple similarity scoring (cosine similarity)
    const cosineSimilarity = (vecA, vecB) => {
      const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
      const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
      const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
      return dotProduct / (normA * normB);
    };

    // Compare query embedding with product descriptions
    const results = products
      .map((p) => {
        const productEmbedding = p.embedding; // store embeddings in DB
        return { ...p, score: cosineSimilarity(queryEmbedding, productEmbedding) };
      })
      .sort((a, b) => b.score - a.score);

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI search failed." });
  }
});

export default router;
