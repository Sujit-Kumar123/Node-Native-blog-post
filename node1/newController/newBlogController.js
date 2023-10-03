const db=require('../dbConfig')
const url=require('url');
const multiparty=require('multiparty')
const fs=require('fs');
const nodeMailer=require('nodemailer');
const multer=require('multer')
// const { result } = require('../dbConfig');
// const multer=require("multer");
// const querystring=require("query-string");
// const upload=multer();




class BlogController{
    static async add_data(req,res){
      // try{
      //     const user_id=req.body.user_id;
      //     //console.log(user_id)
      //     const title=req.body.title;
      //     //console.log(title)
      //     const description=req.body.description;
      //     //console.log(description)
      //     //const image=req.file.path;
      //     //const imageNameArr=image.split('/')
      //     const imageName=req.file.originalname
      //     const errorValidate=validateBlogData(user_id,title,description)
      //     if(errorValidate.length===0){
      //     var emails=[]
      //     db.any('SELECT email FROM users;')
      //     .then(data=>{
      //       const ema=data.map(row=>row.email);
      //       emails=ema;
      //     })
      //     .catch((error)=>{
      //       res.set("Content-Type", "application/json");
      //       res.status(400).send(JSON.stringify({message:'Email not found',error:error})) 
      //     })
      //    // console.log(user_id,title,description,imageName)
      //     db.none('INSERT INTO blog_tables(user_id,title,description,image) VALUES ($1,$2,$3,$4);',[user_id,title,description,imageName])
      //     .then(()=>{
      //                           //main(emails,name)
      //                           res.set("Content-Type", "application/json");
      //                           res.status(200).send(JSON.stringify({message:'Blog added successfully'})) 
      //                       }
      //                   )
      //     .catch((error)=>{
      //       res.set("Content-Type", "application/json");
      //       res.status(400).send(JSON.stringify({message:'Blog Not added'})) 
      //     })
      //     }

      //     else{
      //       res.set("Content-Type", "application/json");
      //       res.status(400).send(JSON.stringify({ errorValidate }));
      //   }
      // }
      // catch(error){
      //       res.set("Content-Type", "application/json");
      //       res.status(500).send(JSON.stringify({error:'Internal server error.'}));
      //   }

//________________________________________________________________________________________________________________________



        try{
            const form=new multiparty.Form(req);
            form.parse(req,(err,fields,files)=>{
          if(err){
           // console.log('Error',err);
            res.set("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({error:"internal server error"}))
        
          }  
          const user_id=fields.user_id[0];
          //console.log(user_id)
          const title=fields.title[0];
          const description=fields.description[0];
          //const name=fields.name[0]
          const imgFile=files.image[0];
          //console.log(imgFile)
          //console.log("ok")
         // const fileExtensions=["png","jpeg","jpg"]
          //console.log(user_id,title,description,imgFile)
         // console.log(!fileExtensions.includes(imgFile.path.split('.').slice(-1)[0]))
          const errorValidate=validateBlogData(user_id,title,description,imgFile)
          if(errorValidate.length===0){
            const image=imgFile.originalFilename;
          //console.log(imgFile.originalFilename)
          //Storing
          const filePath='./UploadImages/images/'+imgFile.originalFilename;
          var emails=[]
          db.any('SELECT email FROM users;')
          .then(data=>{
            const ema=data.map(row=>row.email);
            emails=ema;
          })
          .catch((error)=>{
            res.set("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({message:'Email not found',error:error})) 
          })
        //   const name= db.any('SELECT name FROM users WHERE id=$1;',[user_id]);
        //   console.log(name)
          //console.log(filePath)
          db.none('INSERT INTO blog_tables (user_id,title,description,image) VALUES ($1,$2,$3,$4);',[user_id,title,description,image])
          .then(()=>{
                        fs.rename(imgFile.path,filePath,err=>{
                            if(err){
                                res.set("Content-Type", "application/json");
                                res.status(500).send(JSON.stringify({error:'Internal server error.'}));
                            }
                            else{
                                //main(emails,name)
                                res.set("Content-Type", "application/json");
                                res.status(200).send(JSON.stringify({message:'Blog added successfully'})) 
                            }
                        })
                        
                       
                    })
          .catch((error)=>{
            res.set("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({message:'Blog Not added',error:error})) 
          })
          }
          else{
            res.set("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({ errorValidate }));
        }
          
            
        })
      }
      catch(error){
          res.set("Content-Type", "application/json");
          res.status(500).send(JSON.stringify({error:'Internal server error.'}));
      }
            function validateBlogData(user_id,title,description,imgFile){
                const validationError=[]
                const fileExtension=["png","jpeg","jpg"]
                if (!user_id) {
                    validationError.push({
                      user: "You are not a valid user.",
                    });
                  }
                  if (!title) {
                    validationError.push({
                      title: "Title is required.",
                    });
                  }
                  if (!description) {
                    validationError.push({
                      description: "Description is required.",
                    });
                  }
                  if (imgFile.size===0) {
                    validationError.push({
                    image: "Image is required.",
                    });
                  }
                  if (imgFile.size/(1024*1024)>4) {
                    validationError.push({
                    image: "Image size should be less then 4MB.",
                    });
                  }
                  if(!fileExtension.includes(imgFile.path.split('.').slice(-1)[0])){
                    validationError.push({
                      image:"Image file is not in correct format.",
                    })
                  }
                return validationError
            }
        
        async function main(emails,name){
         const transporter=nodeMailer.createTransport({
                service:'gmail',
                auth:{
                    user:'sujitk.pradhan@hyscaler.com',
                    pass:'Sujit@123'
                }
            })
            //console.log(emails)
            const info=await transporter.sendMail({
                from:'"Blog App"<sujitk.pradhan@hyscaler.com>',
                to:emails,
                subject:'Recommendation for you!',
                text:"Hello!",
                html:`<p>${name} added a new blog for you.</p>`
            }) 
            console.log("Message sent : "+info.messageId)
        }
      
    }
    static async blog_data_id(req,res){
        try{
            const blog_id=req.url.split('/')[3];
           // console.log(blog_id)
            const result=await db.any('SELECT * FROM blog_tables WHERE id=$1',[blog_id]);
            //console.log(result)
            if(result.length!==0){
                res.set("Content-Type", "application/json");
                res.status(200).send(JSON.stringify({result}))  
            }
            else{
                res.set("Content-Type", "application/json");
                res.status(400).send(JSON.stringify({message:'No blog Found.'}))
            }
        }
        catch(error){
        //console.error(error);
        res.set("Content-Type", "application/json");
        res.status(500).send(JSON.stringify({error:'Internal server error.'}))
    }
       
    }
    static async delete(req,res){
        try{
            const blog_id=req.params.blog_id;
           // console.log(blog_id)
            const result=await db.result('DELETE FROM blog_tables WHERE id=$1',[blog_id],r=>r.rowCount);
           // console.log(result)
            if(result){
                res.set("Content-Type", "application/json");
                res.status(200).send(JSON.stringify({message:"Delete successfully"}))  
            }
            else{
                res.set("Content-Type", "application/json");
                res.status(400).send(JSON.stringify({message:'No blog Found.'}))
            }
                
            
        }
        catch(error){
        //console.error(error);
         res.set("Content-Type", "application/json");
         res.status(500).send(JSON.stringify({error:'Internal server error.'}))
    }
       
    }
    static async update_data(req,res){
    
        try{
            const blog_id=req.url.split('/')[3];
            //console.log("Blog",blog_id)
            const form=new multiparty.Form();
            form.parse(req,(err,fields,files)=>{
          if(err){
            //console.log('Error',err);
            res.set("Content-Type", "application/json");
            res.status(500).send(JSON.stringify({error:"internal server error"}))
          }  
          const user_id=fields.user_id[0];
          const title=fields.title[0];
          const description=fields.description[0];
          const imgFile=files.image[0]
         // console.log(imgFile)
          //console.log(user_id,title,description,imgFile)
          const errorValidate=validateBlogData(user_id,title,description,imgFile,blog_id)
          if(errorValidate.length===0){
            const image=imgFile.originalFilename;
         // console.log(imgFile.originalFilename)
          //Storing
          const filePath='./UploadImages/images/'+imgFile.originalFilename;
          //console.log(filePath)
          db.none('UPDATE blog_tables SET user_id=$1,title=$2,description=$3,image=$4 WHERE id=$5;',[user_id,title,description,image,blog_id])
          .then(()=>{
            fs.rename(imgFile.path,filePath,err=>{
                if(err){
                    res.set("Content-Type", "application/json");
                    res.status(400).send(JSON.stringify({error:"Image is not saved"}))
                }
                else{
                    res.statusCode=200;
                    res.set("Content-Type", "application/json");
                    res.status(200).send(JSON.stringify({message:'Blog Update successfully'})) 
                }
            })
           
        })
          .catch((error)=>{
            res.set("Content-Type", "application/json");
            res.status(402).send(JSON.stringify({message:'Blog Not added',error:error})) 
          })
          }
          else{
            res.set("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({ errorValidate }));
          }   
        })
        function validateBlogData(user_id,title,description,imgFile,blog_id){
            const validationError=[]
            const fileExtension=["png","jpeg","jpg"]
            if (!user_id) {
                validationError.push({
                  user: "You are not a valid user.",
                });
              }
              if (!blog_id) {
                validationError.push({
                  blog: "Block is not exit.",
                });
              }
              if (!title) {
                validationError.push({
                  title: "Title is required.",
                });
              }
              if (!description) {
                validationError.push({
                  description: "Description is required.",
                });
              }
              if (imgFile.size===0) {
                validationError.push({
                image: "Image is required.",
                });
              }
              if (imgFile.size/(1024*1024)>4) {
                validationError.push({
                image: "Image size should be less then 4MB.",
                });
              }
              if(!fileExtension.includes(imgFile.path.split('.').slice(-1)[0])){
                validationError.push({
                  image:"Image file is not in correct format.",
                })
              }
            return validationError
        }
            
        }
        catch(err){
            res.set("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({error:'Internal server error.'}));
        }
        
      
    }
    static async search(req,res){
        const query=url.parse(req.url,true).query;
        //console.log(query.q.toLowerCase())
        const searchItem=query.q.toLowerCase();
        try{
            const result= await db.any('SELECT * FROM blog_tables WHERE LOWER(title) LIKE $1',[`%${searchItem}%`]);
            if(result.length!==0){
            res.set("Content-Type", "application/json");
            res.status(200).send(JSON.stringify(result)) ;
             }
             else{
                res.set("Content-Type", "application/json");
                res.status(400).send(JSON.stringify({message:"No record found"})) ;
            }
        }
        catch(error){
            res.set("Content-Type", "application/json");
            res.status(500).send(JSON.stringify({error:'Internal server error.'})); 
        }
        
    }
    static async blog_pagination(req,res){
        const query=url.parse(req.url,true).query;
        const pageNumber=parseInt(query.page);
        const pageSize=parseInt(query.perPage);
        //console.log(typeof(page),perPage)
        const offset=(pageNumber-1)*pageSize;
        try{
            const query={
                text:'SELECT * FROM blog_tables ORDER BY id LIMIT $1 OFFSET $2',
                values:[pageSize,offset],
            };
            const result=await db.query(query);
            const count=await db.query('SELECT COUNT(*) FROM blog_tables');
            //console.log(count)
            if(result.length!==0){
                res.set("Content-Type", "application/json");
                res.status(200).send(JSON.stringify({result: result,count:count})); 
            }
            else{
              res.set("Content-Type", "application/json");
              res.status(404).send(JSON.stringify({error:'No record Found.'})); 
            }
        }
        catch(error){
            res.statusCode=500;
            res.set("Content-Type", "application/json");
            res.status(500).send(JSON.stringify({error:'Internal server error.'})); 
        }
        
    }

}
module.exports=BlogController;