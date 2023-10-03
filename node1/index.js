const user=require('./models/user')
const url=require('url');
const cors = require('cors')
const auth=require('./newController/newUserController.js');
const blog=require('./newController/newBlogController.js');
const comment=require('./newController/newCommentController.js')
const express=require("express");
const multer=require('multer');
const path=require('path');
const app=express();
const fs=require('fs');
const bodyParser=require('body-parser')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


const Auth=new auth();
const User=new user();
const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'UploadImages/images');
    },
    filename:function(req,file,cb){
      cb(null,file.originalname);
    },
  });
  const upload=multer({storage:storage});
  
app.get("/getUser",async(req,res)=>{
    const use=await user.getAllUser()
    res.send(JSON.stringify(use))
})
app.post("/api/register",async(req,res)=>{
    await auth.handleRegistration(req,res);
})
app.post("/api/login",async(req,res)=>{
    await auth.handleLogIn(req,res);
})
app.delete("/api/logout/:id",async(req,res)=>{
    await auth.handleLogout(req,res);
})
app.get("/api/get_user",async(req,res)=>{
    await auth.handleGetUser(req,res);
})

//Blog Routes
app.post("/api/add_data",async(req,res)=>{
    // const user_id=r;
    // console.log(user_id)
    //const image=req.file.;
   await blog.add_data(req,res);
})
app.get("/api/blog_pagination",async(req,res)=>{
    await blog.blog_pagination(req,res);  
})
app.get("/api/search",async(req,res)=>{
    await blog.search(req,res);  
})
app.get("/api/blog_data_id/:blog_id",async(req,res)=>{
    await blog.blog_data_id(req,res);  
})
app.delete("/api/delete/:blog_id",async(req,res)=>{
    //console.log("Delete")
    await blog.delete(req,res); 
})
app.put("/api/update_data/:blog_id",async(req,res)=>{
    await blog.update_data(req,res); 
})

//Comment Routes
app.post("/api/add_comment/:blog_id",async(req,res)=>{
    await comment.add_comment(req,res);
})
app.get("/api/get_comment/:blog_id",async(req,res)=>{
    await comment.get_comment(req,res);
})
app.delete("/api/delete_comment/:comment_id",async(req,res)=>{
    await comment.delete_comment(req,res);
})
app.delete("/api/delete_All_Comment_by_owner/:blog_id",async(req,res)=>{
    await comment.delete_All_Comment_by_owner(req,res);
})
//Image Serve
app.get("/:filename",(req,res)=>{
    const filePath=path.join(__dirname,'UploadImages/images',req.params.filename).split("%20").join(" ");
    //console.log(filePath)
    if(fs.existsSync(filePath)){
        res.sendFile(filePath)
    }
    else{
        res.status(404).send('Image not found')
    }
    // fs.existsSync(filePath,(err,data)=>{
    //     if(err){
    //        // res.writeHead(404);
    //         res.status(500).send('File not found')
    //     }
    //     else{
    //         const ext=path.extname(filePath);
    //         let contentType='image/png';
    //         if(ext==='.jpeg'){
    //             contentType='image/jpeg'
    //         }
    //         else if(ext==='.jpg'){
    //             contentType='image/jpg'
    //         }
    //         res.set('Content-Type',contentType);
    //         console.log(data)
    //         //res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    //         res.sendFile(data);
    //     }
    // })
})


const PORT=process.env.PORT ||8000;
const HOST='localhost';
app.listen(8000,()=>{
    console.log("server running at http://localhost:8000");
});

