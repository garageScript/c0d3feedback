const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.static("public"));
app.use(express.json());

const accessToken = process.env.MATTERMOST_ACCESS_TOKEN || "123";
const channelId = process.env.CHANNEL_ID || "789";
const chatServiceUrl = "https://chat.c0d3.com/api/v4";

app.post("/api/feedbacks", async (req, res) => {
  const { value } = req.body;
  await fetch(`${chatServiceUrl}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      channel_id: channelId,
      message: `Feedback: ${value}`,
    }),
  });
  res.send({ message: "success" });
});

app.listen(3060);
