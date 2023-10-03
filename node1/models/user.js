const db=require('../dbConfig');

class User{
    static async getAllUser(){
        return db.any('SELECT * FROM users;');
    }
    // static async createUser(name,email,password){
    //     return db.none('INSERT INTO users (name,email,password) VALUES ($1,$2,$3);',[name,email,password]);
    // }
    // static async deleteUser(id){
    //     return db.none('DELETE FROM users WHERE id=$1',[id]);
    // }
   async findUser(email){
           const res=await db.any('SELECT * FROM users WHERE email=$1',[email]);
           //console.log(res)
        return res
    }
}
module.exports=User;