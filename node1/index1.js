const http=require('http');
const user=require('./models/user')
const url=require('url');
const path=require('path');
const fs=require('fs');
const auth=require('./controllers/userController');
const blog=require('./controllers/blogController');
const comment=require('./controllers/commentController');


const server=http.createServer(async(req,res)=>{
    // res.setHeader('Access-Control-Allow-Origin','*');
    // res.setHeader('Access-Control-Methods','GET, POST');
    // res.setHeader('Access-Control-Allow-Headers','Content-Type');
    const {pathname}=url.parse(req.url);
   
    //Authentication API
    if(pathname==='/getUser' && req.method==='GET'){
    const use=await user.getAllUser()
        return res.end(JSON.stringify(use))
    }
    
   
    if (pathname ==='/api/register' && req.method ==='POST'){
       // console.log(req.body)
     await auth.handleRegistration(req,res);
    }
    if (req.url==='/api/login' && req.method==='POST'){
        
        await auth.handleLogIn(req,res);
    }
    if (req.url.startsWith('/api/logout') && req.method==='POST'){
        
        await auth.handleLogout(req,res);
    }
    if (req.url==='/api/get-user' && req.method==='GET'){
        await auth.handleGetUser(req,res);
    }
    //Blog API
    if(req.url==='/api/add_data' && req.method==='POST'){
        await blog.add_data(req,res);
       
    }
    if(req.url.startsWith('/api/blog_data_id') && req.method==='GET'){
        await blog.blog_data_id(req,res);  
    }
    if(req.url.startsWith('/api/delete') && req.method==='DELETE'){
        await blog.delete(req,res);  
    }
    if(req.url.startsWith('/api/update_data') && req.method==='PUT'){
        await blog.update_data(req,res);  
    }
    if(pathname==='/api/search' && req.method==='GET'){
        await blog.search(req,res);  
    }
    if(pathname==='/api/blog_pagination' && req.method==='GET'){
        await blog.blog_pagination(req,res);  
    }
    //Comment API
    if (req.url.startsWith('/api/add_comment') && req.method==='POST'){
        await comment.add_comment(req,res);
    }
    if (req.url.startsWith('/api/get_comment') && req.method==='GET'){
        
        await comment.get_comment(req,res);
    }
    if(pathname==='/api/delete_comment' && req.method==='POST'){
        await comment.delete_comment(req,res);
    }
    if(req.url.startsWith('/api/delete_All_Comment_by_owner') && req.method==='DELETE'){
        await comment.delete_All_Comment_by_owner(req,res);
    }



    //Get Images
    if(req.url.startsWith('/')){
        const filePath=path.join(__dirname,'UploadImages/images',req.url).split("%20").join(" ");
        //console.log(filePath)
        fs.readFile(filePath,(err,data)=>{
            if(err){
               // res.writeHead(404);
                res.end('File not found')
            }
            else{
                const ext=path.extname(filePath);
                let contentType='image/png';
                if(ext==='.jpeg'){
                    contentType='image/jpeg'
                }
                else if(ext==='.jpg'){
                    contentType='image/jpg'
                }
                res.setHeader('Content-Type',contentType);
                //res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
                res.end(data);

            }
        })
         }

});
const PORT=process.env.PORT ||8000;
const HOST='localhost';
server.listen(8000,()=>{
    console.log("server running at http://localhost:8000");
});


