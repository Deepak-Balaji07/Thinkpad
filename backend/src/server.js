import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001


//middleware
app.use(cors({
  orgin:"http://localhost:5173",
}
));
app.use(express.json());//this middleware will parse JSON bodies:req.body
app.use(rateLimiter); 

//our simple custom middleware
// app.use((req,res,next)=>{
//   console.log("We just got a New reaq");
//   next();
// })
app.use("/api/notes", notesRoutes);

//endpoint?
// combination of URL+HTTP method that lets the client
//interact with special resource

connectDB().then(()=>{
  app.listen(PORT, () => {
  console.log("server started on port : ",PORT);
});
});



