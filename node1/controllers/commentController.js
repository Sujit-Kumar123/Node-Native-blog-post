const db = require("../dbConfig");
const url = require("url");

class CommentController {
  static async add_comment(req, res) {
    try {
      const blog_id = req.url.split("/")[3];
      //console.log(blog_id);
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const { user_id, name, message } = JSON.parse(body);
        //console.log(user_id, name, message, blog_id);
        const err=validateComment(user_id,name,message,blog_id)
        if(err.length===0){
          db.none("INSERT INTO comments (user_id,blog_id,name,message) VALUES ($1,$2,$3,$4);",[user_id, blog_id, name, message])
    .then(()=> {
      res.statusCode=200;
      res.end(JSON.stringify({message:'Comment added successfully'})) 
           })
      .catch((error)=>{
            res.end(JSON.stringify({message:'Comment is not added',error:error})) 
        })
        }
        else{
          return res.end(JSON.stringify({ err }));
        }
    
      });
    function validateComment(user_id,name,message,blog_id){
      const validationError=[]
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
      if (!name) {
        validationError.push({
          user: "You are not a valid user.",
        });
      }
      if (!message) {
        validationError.push({
          message: "Message field required.",
        });
      }
      return validationError
    }
    } catch (error) {
      //console.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Internal server error." }));
    }
  }
  static async get_comment(req,res){
    try{
        const blog_id = req.url.split("/")[3];
        //console.log(blog_id)
        const result=await db.any('SELECT * FROM comments WHERE blog_id=$1',[blog_id]);
        //console.log(result)
        if(result.length!==0){
            res.writeHead(200,{'Content-Type':'application/json'})
            res.end(JSON.stringify(result));
        }
        else{
            res.statusCode = 402;
            res.end(JSON.stringify({ error: "No comments Found ." }));
        }
    }
    catch{
        //console.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Internal server error." }));
    }
   
  }




  static async delete_comment(req,res){
    try{
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", async () => {
            const {comment_id,user_id}=JSON.parse(body)
            //console.log(comment_id,user_id)
            const result=await db.result('DELETE FROM comments WHERE id=$1 and user_id=$2',[comment_id,user_id],r=>r.rowCount);
            //console.log(result)
            if(result!==0){
                res.statusCode=200;
                res.end(JSON.stringify({message:"Comment is deleted successfully"}))  
            }
            else{
                res.statusCode=402;
                res.end(JSON.stringify({message:'No Such Comment found.'}))
            }  
        })
    }
    catch{
      //console.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Internal server error." }));
    }
  }




  
  static async delete_All_Comment_by_owner(req,res){
    const blog_id = req.url.split("/")[3];
    console.log(blog_id)
    const result=await db.result('DELETE from comments where blog_id=$1',[blog_id],r=>r.rowCount);
    console.log(result)
    if(result!==0){
        res.statusCode=200;
        res.end(JSON.stringify({message:"All comment is deleted successfully"}))  
    }
    else{
        res.statusCode=402;
        res.end(JSON.stringify({message:'No Such Comment found.'}))
    } 
  }
}
module.exports = CommentController;
