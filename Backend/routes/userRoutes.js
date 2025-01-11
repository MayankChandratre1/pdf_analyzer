import express from "express"

const userRouter = express.Router()


userRouter.post("/signup", async (req, res)=>{
    console.log(req.body);
    
    res.status(200).json({
        data: req.body
    })
})

userRouter.get("/getUser/:clerkId", async (req, res)=>{
    console.log(req.headers);
    
    console.log(req.params);
    
    res.status(200).json({
        data: "Hehe"
    })
})

export default userRouter