const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

app.post("/analyze", async (req, res) => {
  const { url } = req.body;

  try {
    const replicateResponse = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version: "your-model-version-id",
        input: { video_url: url }
      },
      {
        headers: {
          "Authorization": `Token ${process.env.REPLICATE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const recipe = replicateResponse.data.output;
    res.json({ recipe });
  } catch (err) {
    res.status(500).json({ error: "AI analysis failed", details: err.message });
  }
});

app.listen(process.env.PORT || 3000);
