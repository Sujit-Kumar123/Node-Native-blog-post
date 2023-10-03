const db = require("../dbConfig");
const url = require("url");

class CommentController {
  static async add_comment(req, res) {
    try {
        const blog_id = req.url.split("/")[3];
        const { user_id, name, message } = req.body;
        //console.log(user_id, name, message, blog_id);
        const err=validateComment(user_id,name,message,blog_id)
        if(err.length===0){
          db.none("INSERT INTO comments (user_id,blog_id,name,message) VALUES ($1,$2,$3,$4);",[user_id, blog_id, name, message])
    .then(()=> {
      res.set('Content-Type','application/json');
      res.status(200).send(JSON.stringify({message:'Comment added successfully'})) 
           })
      .catch((error)=>{
            res.set('Content-Type','application/json');
            res.status(400).send(JSON.stringify({message:'Comment is not added',error:error})) 
        })
        }
        else{
            res.set('Content-Type','application/json');
            res.status(402).send(JSON.stringify({ err }));
        }
        } 
        catch (error) {
        //console.error(error);
        res.set('Content-Type','application/json');
        res.status(500).send(JSON.stringify({ error: "Internal server error." }));
      }
      
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
    
  }
  static async get_comment(req,res){
    try{
        const blog_id = req.url.split("/")[3];
        //console.log(blog_id)
        const result=await db.any('SELECT * FROM comments WHERE blog_id=$1',[blog_id]);
        //console.log(result)
        if(result.length!==0){
            res.set('Content-Type','application/json');
            res.status(200).send(JSON.stringify(result));
        }
        else{
            res.set('Content-Type','application/json');
            res.status(402).send(JSON.stringify({ error: "No comments Found ." }));
        }
    }
    catch{
        //console.error(error);
        res.set('Content-Type','application/json');
      res.status(500).send(JSON.stringify({ error: "Internal server error." }));
    }
   
  }




  static async delete_comment(req,res){
    try{
            const comment_id = req.url.split("/")[3];
            const result=await db.result('DELETE FROM comments WHERE id=$1',[comment_id],r=>r.rowCount);
            console.log(result)
            if(result!==0){
                res.set('Content-Type','application/json');
                res.status(200).send(JSON.stringify({message:"Comment is deleted successfully"}))  
            }
            else{
                res.set('Content-Type','application/json');
                res.status(400).send(JSON.stringify({message:'No Such Comment found.'}))
            }  
    }
    catch{
      //console.error(error);
      //res.statusCode = 500;
      res.set('Content-Type','application/json');
      res.status(500).send(JSON.stringify({ error: "Internal server error." }));
    }
  }




  
  static async delete_All_Comment_by_owner(req,res){
    try{
    const blog_id = req.url.split("/")[3];
    //console.log(blog_id)
    const result=await db.result('DELETE from comments where blog_id=$1',[blog_id],r=>r.rowCount);
    //console.log(result)
    if(result!==0){
        //res.statusCode=200;
        res.set('Content-Type','application/json');
        res.status(200).send(JSON.stringify({message:"All comment is deleted successfully"}))  
    }
    else{
        res.set('Content-Type','application/json');
        res.status(402).send(JSON.stringify({message:'No Such Comment found.'}))
    } 
   }catch{
    //console.error(error);
    //res.statusCode = 500;
    res.set('Content-Type','application/json');
    res.status(500).send(JSON.stringify({ error: "Internal server error." }));
  }
  }
}
module.exports = CommentController;
