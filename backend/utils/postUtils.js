import fetch from 'node-fetch'; // Ensure you have node-fetch installed

import dotenv from "dotenv";
dotenv.config();

const queryHuggingFace = async (content) => {
  try {
    // Fetch classes from the .env variable
    const classes = process.env.CLIMATE_CLASSES.split(","); // ["Flood", "Drought", "Cyclone", ...]

    const response = await fetch(
      "https://api-inference.huggingface.co/models/MoritzLaurer/mDeBERTa-v3-base-xnli-multilingual-nli-2mil7",
      {
        headers: {
          Authorization: `Bearer ${process.env.ZSCM}`, // Replace with your Hugging Face API key
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: content,
          parameters: {
            candidate_labels: classes,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Model query failed: ${response.statusText}`);
    }

    const result = await response.json();

    // Create the vector with classes in the same order as in .env and map scores
    const vector = classes.map((label) => {
      const index = result.labels.indexOf(label);  // Find the index of the label in the model response
      return {
        label: label,
        score: index !== -1 ? result.scores[index] : 0,  // Default to 0 if not present
      };
    });

    return vector; // Return the vector with labels and their scores

  } catch (error) {
    console.error("Error querying Hugging Face model:", error);
    return null;
  }
};

export default queryHuggingFace;