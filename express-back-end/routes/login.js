// Login Post Route
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


module.exports = (db) => {

  // router.post("/", (req, res) => {
  //   console.log(req.body);
  //   res.send('sent!');
  // });

   // login function - authenticates user
   const login = function(email, password) {
    const queryString = `
    SELECT * FROM users 
    WHERE email = $1;
   `;
    const values = [email];
    return db.query(queryString, values)
      .then(res => res.rows[0])
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
  };
  // Checks if email/password is in database
  router.post('/', (req,res) => {
      const { email, password } = req.body;
      console.log(req.params);
      login(email, password)
        .then(user => {
          if (!user) {
            res.status(401).send({ error: 'Email or Password don\'t match' });
            return;
          }
          req.session.user_info = user;
          res.redirect('/');
        })
        .catch(e => {
          res.send(e)
        });
    });
 


  return router;
};