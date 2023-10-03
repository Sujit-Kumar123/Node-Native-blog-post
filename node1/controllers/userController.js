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
    console.log("register");
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const { name, email, password, password2 } = JSON.parse(body);
        //console.log(name, email, password);
        const err = registrationFormValidate(name, email, password, password2);
        if (err.length === 0) {
          const exi = await db.any("SELECT * FROM users WHERE email=$1;", [
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
                console.log("OK");
                res.writeHead(200, { "Content-Type": "application/json" });
                
                res.end(
                  JSON.stringify({ message: "User registration successful" })
                );
              })
              .catch((error) => {
                res.statusCode = 400;
                res.end(
                  JSON.stringify({
                    message: "Registration deny.",
                    error: error,
                  })
                );
              });
          } else {
            res.end(JSON.stringify({ message: "User already exit" }));
          }
        } else {
          return res.end(JSON.stringify({ err }));
        }
      });
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
    } catch (error) {
      //console.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Internal server error." }));
    }
  }

  static async handleLogIn(req, res) {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end",async() => {
        const { email, password } = JSON.parse(body);
        //console.log(email,password);
        //res.end(JSON.stringify({ message: "OK" }));
        const err = loginFormValidation(email, password);
        if (err.length === 0) {
          const result =await  db.query('SELECT * FROM users WHERE email=$1',[email]);
          //});
          console.log(result)
          //res.end(JSON.stringify({ message: "OK" }));
          if (result.length !== 0) {
            const hashedPassword = result[0].password;
            bcrypt.compare(password, hashedPassword, (err, isMatch) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "User is not exit" }));
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

                              console.log(token);
                              res.writeHead(200, { "Content-Type": "application/json" });
                              res.end(token);
                              console.log(res);
                              
                            } else {
                              res.writeHead(404, { "Content-Type": "application/json" });
                              console.log("not updated");
                              res.end(JSON.stringify({ message: "Token Not saved" }));
                            }
              } else {
                res.writeHead(400, { "Content-Type": "application/json" });
                console.log("Password Miss-Match");
                res.end(JSON.stringify({ message: "Password Miss-Match" }));
              }
            });
          } else {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Email not found" }));
          }
        } else {
          res.statusCode = 500;
          res.end(JSON.stringify({ err }));
        }
      });
    } catch (error) {
      //console.error(error);
      res.statusCode = 500;
      // res.end(JSON.stringify({ error: "Internal server error." }));
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
      const user_id = req.url.split("/")[3];
      //console.log(user_id)
      const result = await db.result(
        "DELETE FROM users_tokens WHERE user_id=$1",
        [user_id],
        (r) => r.rowCount
      );
      //console.log(result)
      if (result) {
        res.end(JSON.stringify({ message: "User logout successful" }));
      } else res.end(JSON.stringify({ message: "User logout deny" }));
    } catch (error) {
      //console.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Internal server error." }));
    }
  }
  static async handleGetUser(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      //console.log(token);
      const secret = "secret_key";
      const decoded = jwt.verify(token, secret);
      //console.log(decoded);
      res.end(JSON.stringify({ user: decoded }));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Invalid Token ." }));
    }
  }
}
module.exports = AuthenticationUser;
