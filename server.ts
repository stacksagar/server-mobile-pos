import http from "http";
import app from "./app/app";
const server = http.createServer(app);
const PORT = process.env.PORT || 1000;

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
