import express from "express";

const app = express();
app.use(express.json());

const port = 4321;
const shoutOutApiUrl = process.env.BACKEND_URL || "http://localhost:8080";

app.post("/auth/token", (req, res) => {
  res.json({
    access_token: "1234",
    expires_in: 2147483647,
    ext_expires_in: 2147483647,
    token_type: "Bearer",
  });
});

app.post("/sms/sendbatch", (req, res) => {
  const messages = req.body.sendRequestMessages;
  const response = messages.map((m) => {
    setTimeout(() => {
      fetch(shoutOutApiUrl + "/api/v1/link/report", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          refId: m.refId,
          resultCode: 1001,
        }),
      });
    }, 10000);

    return {
      messageId: "abc123",
      resultCode: 1005,
      description: "",
      refId: m.refId,
    };
  });

  res.json(response);
});

app.listen(port, () => console.log("Listening on " + port));
