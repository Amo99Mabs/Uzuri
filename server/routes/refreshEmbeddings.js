// server/routes/refreshEmbeddings.js
import express from "express";
import OpenAI from "openai";
import Product from "../models/Product.js";

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/refresh-embeddings", async (req, res) => {
  try {
    const products = await Product.find();

    for (let product of products) {
      if (!product.description) continue;

      // Only regenerate if description changed or embedding missing
      if (!product.embedding || product.isModified("description")) {
        const response = await client.embeddings.create({
          model: "text-embedding-ada-002",
          input: product.description,
        });

        product.embedding = response.data[0].embedding;
        await product.save();
        console.log(`✅ Refreshed embedding for: ${product.name}`);
      }
    }

    res.json({ message: "Embeddings refreshed successfully" });
  } catch (err) {
    console.error("❌ Error refreshing embeddings:", err);
    res.status(500).json({ error: "Failed to refresh embeddings" });
  }
});

export default router;