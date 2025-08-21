import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { connectDB } from './db';
import User from './models/userModel';
import { auth } from './middleware/authMiddleware';
import Content from './models/contentModel';
import Link from './models/linkModel';
import { generateRandomKey } from './util/utils';

dotenv.config();
const app = express();

app.use(express.json());
connectDB();


app.post("/api/v1/signup", async (req, res) => {
   const { username, password } = req.body;
   try {
      const existingUser = await User.findOne({ username })
      if (existingUser) {
         res.status(401).json({
            message: "You are already registed with this username"
         })
      } else {
         const saltRound = 10;
         const hashPassword = await bcrypt.hash(password, saltRound);
         const user = new User({ username, password: hashPassword });
         await user.save();
      }

      res.status(201).json({
         message: "Successfully Registered"
      })
   }
   catch (err) {
      console.error(err);
   }
})

app.post("/api/v1/signin", async (req, res) => {

   const { username, password } = req.body;
   const user = await User.findOne({ username });
   if (!user) {
      return res.status(404).json({
         message: "User not found"
      })
   }

   const passwordMatch = await bcrypt.compare(password, user.password);

   if (passwordMatch) {
      const token = jwt.sign({userId : user.id}, process.env.JWT_SCRECT as string);
      res.status(200).json({
         message: "Login successfully",
         token: {token}
      })
   }
   else {
      res.status(401).json({
         message: "Incorrect password"
      })
   }

})

app.post("/api/v1/content", auth, async(req, res) => {
   const { title, link, type }  = req.body;
   try{
      const content = await Content.create({
         title,
         link,
         type,
         //@ts-ignore
         userId : req.userId,
         tags : []
      });
      
      res.status(201).json({
         message: "Content added"
      })
   }
   catch(err){
      res.status(500).json({
         message: "Something went wrong",
         error: {err}
      })
   }

})

app.get("/api/v1/content", auth, async (req, res) => {
   //@ts-ignore
   const userId = req.userId;
   try{
   const content = await Content.find({
      userId: userId
   }).populate("userId", "username");

   res.status(200).json({
      content
   })
   }
   catch(err){
      res.status(500).json({
         message: "Something went wrong",
         error: {err}
      })
   }
})

app.delete("/api/v1/content", auth, async (req, res) => {

   const contentId = req.body.contentId;

   try{
      const deletedItem = await Content.deleteOne({
         contentId,
         //@ts-ignore
         userId : req.userId
      })

      res.status(201).json({
         message: "Successfully deleted the content"
      })

   }
   catch(err){
      res.status(500).json({
         message: "Something went wrong",
         error: {err}
      })
   }
})

app.post("/api/v1/brain/share", auth, async (req, res) => {
   const share = req.body.share;
   try{
      if(share){
         await Link.create({
            //@ts-ignore
            userId : req.userId,
            hash : generateRandomKey(15)
         });
      }
      else{
        await Link.deleteOne({
         //@ts-ignore
            userId: req.userId
         });
      }
      res.status(201).json({
         message: "Update shareable link"
      })

   }
    catch(err){
      res.status(500).json({
         message: "Something went wrong",
         error: {err}
      })
   }

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})


app.listen(process.env.PORT, () => {
   console.log(`App listening on port ${process.env.PORT}`)
})