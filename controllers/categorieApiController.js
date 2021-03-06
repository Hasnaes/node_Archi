let connection = require('../db');
let catListe = [];
let Categorie = require('../models/categoriesModel')

exports.listeCatreading = function (req,res){
    connection.query("SELECT red.Bookname as nom, FK_iduser, red.Author as auteur, cat.CatName as category, red.Statut as statut FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID ;", function (error, resultSQL) { 
        if (error)  {
            res.status(400).json({'message' : error});       
        }
        else {
            res.status(200);
            catListe =  resultSQL;

            console.log(catListe);
            res.json({catégorie:catListe});
        }
    });

}
exports.catfiltre = function (req,res){
     let catfiltre = req.params.CatName;
    connection.query("SELECT red.Bookname as nom, FK_iduser, red.Author as auteur, cat.CatName as category, red.Statut as statut FROM users.reading red inner join users.catégorie cat on red.FK_CatégorieID = cat.CatégorieID where cat.CatName = ? ;",[catfiltre], function (error, resultSQL) { 
        if (error)  {
            res.status(400).json({'message' : error});        
        }
        else {
            res.status(200);
            catListe =  resultSQL;
            console.log(catListe);
            res.json({catégorie:catListe});
        }
    });
}

exports.addcatreading =  function(req, res) {
    let CatégorieID =  req.body.CatégorieID;
    let CatName = req.body.CatName;
    let categ = new Categorie (CatégorieID, CatName);
        console.log(categ);
        connection.query("INSERT INTO catégorie set ?", categ, function (error, resultSQL) {
            if(error) {
                res.status(400).json({'message' : error}); 
            }
            else{
                res.status(200).json({'message' : 'success'}); 
               

             
            }
        });
    }

exports.categoriename = function (req,res){
    connection.query("SELECT CatégorieID, CatName as category FROM users.catégorie ;", function (error, resultSQL) { 
        if (error)  {
            res.status(400).json({'message' : error});        
            }
            else {
            res.status(200);
            catListe =  resultSQL;
            console.log(catListe);
            res.json({catégorie:catListe});     
               }
        });
     }

    