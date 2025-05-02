import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongoDB } from "./connection.js";
import AuthRouter from "./routes/AuthRoutes.js";
import BlogRouter from "./routes/BlogRouter.js";
import CommentRouter from "./routes/CommentRoutes.js";
import GenresRouter from "./routes/GenreRoutes.js";
import { getSentiment } from "./blog/sentiment.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const corsOption={
  origin:"https://blogapp-3ul0.onrender.com",
  credentials:true
}
app.use(cors(corsOption));
app.use(express.json());

connectToMongoDB();

const _dirname=path.resolve();

app.use("/auth", AuthRouter);
app.use("/blog", BlogRouter);
app.use("/comment", CommentRouter);
app.use("/genres", GenresRouter);

app.use(express.static(path.join(_dirname, "/frontend/dist"))); 
app.get('*', (req,res)=>{  
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

app.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`); 
});

getSentiment();
