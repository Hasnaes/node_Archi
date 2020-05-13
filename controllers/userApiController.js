let connection = require('../db');
let listuser = [];
let User = require('../models/userModel');

exports.listuser = function (req, res) {
    connection.query("SELECT * FROM users.user;", function (error, resultSQL) {
        if (error) {
            res.status(400).json({'message' : error});
        }
        else {
            res.status(200);
            listuser = resultSQL;
            console.log(listuser);
            res.json({user:listuser});
        }
    });
}
exports.register = function(req, res) {
    let userid = req.body.userid;
    let name= req.body.name;
    let email= req.body.email;
    let password= req.body.password;
    let user = new User (userid, name, email, password);
   connection.query('INSERT INTO user SET ?', user, (err, results) => {  
     if (err) throw err;
     else {
       console.log('Data inserted!', results);  
       res.json({'message' : 'success'});
     }
   });
 };

exports.userRemove = function (request, response) {
    let sql = "DELETE FROM `users`.`user` WHERE userid = ?";
    connection.query( sql , [request.session.userid], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message' : error});
        }
        else{
            response.json({'message' : 'success'});   
        }
    }); 
    
 }