// client/src/components/RefreshEmbeddingsButton.js
import React from "react";
import axios from "axios";

function RefreshEmbeddingsButton() {
  const handleRefresh = async () => {
    try {
      const res = await axios.post("http://localhost:5004/api/refresh-embeddings");
      alert(res.data.message); // show success message
    } catch (err) {
      console.error("Failed to refresh embeddings:", err);
      alert("Error refreshing embeddings");
    }
  };

  return (
    <button className="refresh-button" onClick={handleRefresh}>
      Refresh Product Embeddings
    </button>
  );
}

export default RefreshEmbeddingsButton;