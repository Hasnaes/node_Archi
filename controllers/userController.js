let User = require('../models/userModel'); // import du schéma/ modèle dans Controller
let connection = require('../db'); // db connectée avec le serveur est crée dans la var connection

// Gestion actions sur le MODEL!
exports.loginpage = function(req, res) {
    res.render('loginPage.ejs'); // utilisation du template (response to the request)
  };

exports.login = function (req,res){
    let email = req.body.email,           //declare email/password variable
    password = req.body.password;

if (email && password) {
  connection.query(
    'SELECT * FROM users.user WHERE email = ? AND password = ?',  //set conn query to mysql
    [email, password],    //insert email and password as data
    (err, results) => {   //function for error throwing and the results
      if (err) throw err;
      if (results.length > 0) {
        console.log(results)
        req.session.userid = results[0].userid;  //set loggedin property as true
        req.session.email = email;    //set email property as email itself
        res.redirect('/mainpage');    //redirect= vers une route 
      } else {
        res.json({    //json output with error and error code
          code: 400,
          err: 'Incorrect credentials'
        });
      }
      res.end();
    }
  );
}
};

// Send form to update user
exports.userFormadd = function(request, response) {
    response.render('register.ejs');
}
exports.register = function(req, res) {
       let userid = req.body.userid;
       let name= req.body.name;
       let email= req.body.email;
       let password= req.body.password;
       let user = new User (userid, name, email, password);
      connection.query('INSERT INTO user SET ?', user, (err, results) => {  //set conn query to mysql with err and the results
        if (err) throw err;
        else {
          console.log('Data inserted!', results);  //output to console
          res.redirect('/loginPage');  //redirect to login page
        }
      });
    };


exports.userRemove = function (request, response) {
    let sql = "DELETE FROM `users`.`user` WHERE userid = ?";
    connection.query( sql , [request.session.userid], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/loginPage');
        }
    }); 
    
 };
 exports.confirm = function (req,res){
    res.render('confirm.ejs');
 }
 exports.updateUser = function (req,res){
  let userid = req.body.userid;
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let user = new User(userid, name, email, password);
      console.log(user);

      connection.query("UPDATE `users`.`user` SET ? WHERE userid = ?", [user, req.session.userid] , function (error, resultSQL) {
          if(error) {
              res.status(400).send(error);
          }
          else{
              res.status(201).redirect('/mainpage');
          }
      });
  }
  exports.UpdateFormUser = function (req,res){
    connection.query("SELECT * FROM `users`.`user` where userid = ?", req.session.userid ,function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            user = resultSQL;
            res.render('updateuser.ejs', {userid:user[0].userid, name:user[0].name, email:user[0].email, password:user[0].password});
        }
    });
  }
