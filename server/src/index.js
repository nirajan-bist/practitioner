import app from "./app";

const PORT = process.env.NODE_PORT;

// Listen to the port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
