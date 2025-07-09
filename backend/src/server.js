import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      orgin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); //this middleware will parse JSON bodies:req.body
app.use(rateLimiter);

//our simple custom middleware
// app.use((req,res,next)=>{
//   console.log("We just got a New reaq");
//   next();
// })
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

//endpoint?
// combination of URL+HTTP method that lets the client
//interact with special resource

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server started on port : ", PORT);
  });
});
