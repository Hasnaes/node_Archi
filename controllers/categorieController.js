let connection = require('../db');
let catListe = [];
let Categorie = require('../models/categoriesModel')

exports.listeCatreading = function (req,res){
    connection.query("SELECT red.Bookname as nom, FK_iduser, red.Author as auteur, cat.CatName as category, red.Statut as statut FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID where red.FK_iduser = ?;",req.session.userid, function (error, resultSQL) { 
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            catListe =  resultSQL;

            console.log(catListe);
            res.render('categoriereading.ejs', {catégorie:catListe});
        }
    });

}
exports.catfiltre = function (req,res){
     let catfiltre = req.params.CatName;
    connection.query("SELECT red.Bookname as nom, FK_iduser, red.Author as auteur, cat.CatName as category, red.Statut as statut FROM users.reading red inner join users.catégorie cat on red.FK_CatégorieID = cat.CatégorieID where cat.CatName = ? AND red.FK_iduser = ?;",[catfiltre,req.session.userid], function (error, resultSQL) { 
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            catListe =  resultSQL;
            console.log(catListe);
            res.render('categoriereading.ejs', {catégorie:catListe});
        }
    });
}
exports.catFormAddreading = function(req, res) {
    res.render('catAddreading.ejs', {CatégorieID : "", CatName : "" });
}
exports.addcatreading =  function(req, res) {
    let CatégorieID =  req.query.CatégorieID;
    let CatName = req.body.CatName;
    let categ = new Categorie (CatégorieID, CatName);
        console.log(categ);
        connection.query("INSERT INTO catégorie set ?", categ, function (error, resultSQL) {
            if(error) {
                res.status(400).send(error);
            }
            else{
                res.status(201).redirect('/categoriename');
               

             
            }
        });
    }

exports.categoriename = function (req,res){
    connection.query("SELECT CatName as category FROM users.catégorie ;", function (error, resultSQL) { 
        if (error)  {
            res.status(400).send(error);        
            }
            else {
            res.status(200);
            catListe =  resultSQL;
            console.log(catListe);
            res.render('categoriechoice.ejs', {catégorie:catListe});            }
        });
     }

    