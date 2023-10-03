const passport = require("passport");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const url = require("url");
//const LocalStrategy=require('passport-local').Strategy;
const db = require("../dbConfig");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const User = new user();
class AuthenticationUser {
  static async handleRegistration(req, res) {
    const {name,email,password,password2}=req.body;
    const err = registrationFormValidate(name, email, password, password2);
        if (err.length === 0) {
          const exi =await db.any("SELECT * FROM users WHERE email=$1;", [
            email,
          ]);
          //console.log(exi)
          if (exi.length === 0) {
            const hashedPassword = await bcrypt.hash(password, 10);
            //console.log(hashedPassword)
            db.none(
              "INSERT INTO users (name,email,password) VALUES ($1,$2,$3);",
              [name, email, hashedPassword]
            )
              .then(() => {
                res.set("Content-Type", "application/json");
                res.status(200).send(
                  JSON.stringify({ message: "User registration successful" })
                );
              })
              .catch((error) => {
                res.set("Content-Type", "application/json");
                res.status(400).send(
                  JSON.stringify({
                    message: "Registration deny.",
                    error: error,
                  })
                );
              });
          } else {
            res.set("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({ message: "User already exit" }));
          }
        } else {
            res.set("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({ err }));
        }
    
    
    function registrationFormValidate(name, email, password, password2) {
        const emailRegex = /^[a-z 0-9 A-Z .\- _]+@[a-z]+\.[a-z]{2,3}$/;
        const validationError = [];
        //console.log(email, name, password, password2);
        //console.log(emailRegex.test(email));
        if (!name) {
          validationError.push({
            name: "Name field required.",
          });
        }
        if (!email) {
          validationError.push({
            email: "Email field required.",
          });
        }
        if (emailRegex.test(email) === false) {
          validationError.push({
            email: "Enter a valid email.",
          });
        }
        if (!password) {
          validationError.push({
            password: "Password field required.",
          });
        }
        if (/[a-z]/.test(password) === false) {
          validationError.push({
            password: "Password must contain at least one lower case alphabet.",
          });
        }
        if (/[A-Z]/.test(password) === false) {
          validationError.push({
            password: "Password must contain at least one upper case alphabet.",
          });
        }
        if (/[0-9]/.test(password) === false) {
          validationError.push({
            password: "Password must contain at least one numeric value.",
          });
        }
        if (password.length < 4) {
          validationError.push({
            password: "Password length should be gather then 4.",
          });
        }
        if (password.length > 16) {
          validationError.push({
            password: "Password length should not gather then 16.",
          });
        }
        if (!password2) {
          validationError.push({
            password2: "Password2 field required.",
          });
        }
        if (password !== password2) {
          validationError.push({
            password: "Password must be similar to password2.",
          });
        }
        return validationError;
      }
   }

 static async handleLogIn(req, res){
    try {
        const {name,email,password,password2}=req.body;
        const err = loginFormValidation(email, password);
        if (err.length === 0) {
          const result =await  db.query('SELECT * FROM users WHERE email=$1',[email]);
          //});
          //console.log(result)
          //res.send(JSON.stringify({ message: result }));
          if (result.length !== 0) {
            const hashedPassword = result[0].password;
            bcrypt.compare(password, hashedPassword, (err, isMatch) => {
              if (err) {
                res.set("Content-Type", "application/json");
                res.status(400).send(JSON.stringify({ message: "User is not exit" }));
              } else if (isMatch) {
                //res.end(JSON.stringify({message:'User login  successful'}))
                const payload = {
                  id: result[0].id,
                  username: result[0].name,
                  email: result[0].email,
                };
                const secret = "secret_key";
                const option = {
                  expiresIn: "12h",
                };
                const tokenValue = jwt.sign(payload, secret, option);
                const update_token = db.none(
                  "INSERT INTO users_tokens (user_id,token) VALUES ($1,$2);",
                  [result[0].id, tokenValue]
                );
                            if (update_token) {
                              const token = JSON.stringify({
                                token: tokenValue.toString(),
                              });

                              //console.log(token);
                              res.set("Content-Type", "application/json");
                              res.status(200).send(token);
                              
                              
                            } else {
                              res.set("Content-Type", "application/json");
                             // console.log("not updated");
                              res.status(400).send(JSON.stringify({ message: "Token Not saved" }));
                            }
              } else {
                res.set("Content-Type", "application/json");
                //console.log("Password Miss-Match");
                res.status(400).send(JSON.stringify({ message: "Password Miss-Match" }));
              }
            });
          } else {
            res.set("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({ message: "Email not found" }));
          }
        } else {
            res.set("Content-Type", "application/json");
            res.status(400).send(JSON.stringify({ err }));
        }
    } catch (error) {
      //console.error(error);
      res.set("Content-Type", "application/json");
      res.status(400).snd(JSON.stringify({ error: "Internal server error." }));
    }
    function loginFormValidation(email, password) {
      const emailRegex = /^[a-z 0-9 A-Z .\- _]+@[a-z]+\.[a-z]{2,3}$/;
      const validationError = [];
      //console.log(name, password);
      //console.log(emailRegex.test(email));

      if (!email) {
        validationError.push({
          email: "Email field required.",
        });
      }
      if (emailRegex.test(email) === false) {
        validationError.push({
          email: "Enter a valid email.",
        });
      }
      if (!password) {
        validationError.push({
          password: "Password field required.",
        });
      }
      if (/[a-z]/.test(password) === false) {
        validationError.push({
          password: "Password must contain at least one lower case alphabet.",
        });
      }
      if (/[A-Z]/.test(password) === false) {
        validationError.push({
          password: "Password must contain at least one upper case alphabet.",
        });
      }
      if (/[0-9]/.test(password) === false) {
        validationError.push({
          password: "Password must contain at least one numeric value.",
        });
      }
      if (password.length < 4) {
        validationError.push({
          password: "Password length should be gather then 4.",
        });
      }
      if (password.length > 16) {
        validationError.push({
          password: "Password length should not gather then 16.",
        });
      }
      return validationError;
    }
}

static async handleLogout(req, res) {
    try {
      const user_id = req.params.id;
      //console.log(user_id)
      const result = await db.result(
        "DELETE FROM users_tokens WHERE user_id=$1",
        [user_id],
        (r) => r.rowCount
      );
      //console.log(result)
      if (result) {
        res.set("Content-Type", "application/json");
        res.status(200).send(JSON.stringify({ message: "User logout successful" }));
      } else {
        res.set("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "User logout deny" }));
      }

    } catch (error) {
      //console.error(error);
      res.set("Content-Type", "application/json");
      res.status(200).send(JSON.stringify({ error: "Internal server error." }));
    }
  }
 static async handleGetUser(req, res) {
    try {
      const token = req.headers.authorization;
      //console.log(token);
      const secret = "secret_key";
      const decoded = jwt.verify(token, secret);
      //console.log(decoded);
      res.set("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(decoded));
    } 
    catch (error) {
      res.set("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ error: "Invalid Token ." }));
    }
  }
  static async addProfilePicture(req,res){
  //   try{
  //     const form=new multiparty.Form();
  //     form.parse(req,(err,fields,files)=>{
  //   if(err){
  //    // console.log('Error',err);
  //     res.set("Content-Type", "application/json");
  //     res.status(400).send(JSON.stringify({error:"internal server error"}))
  
  //   }  
  //   const user_id=fields.user_id[0];
  //   const title=fields.title[0];
  //   const description=fields.description[0];
  //   //const name=fields.name[0]
  //   const imgFile=files.image[0]
  //   })
  //  }  
}
}
module.exports = AuthenticationUser;
