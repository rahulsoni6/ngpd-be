import express from  "express";
import dotenv from "dotenv"
dotenv.config()
import cors from 'cors';
import router from "./components";
import connectDB from "./config/db";

const app = express();
const PORT = process.env.PORT

app.use(cors({
  origin: "*"
})); 
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API server!",
    status: "success",
    docs: "/api/v1",
  });
});

app.use('/api/v1', router)

connectDB()
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
