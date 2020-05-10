let connection = require('../db');
let readingList = [];
let Serie = require('../models/readingModel')


exports.mainpage = function (req,res){
     console.log(req.session)
    connection.query("SELECT red.ReadingID, FK_iduser, red.Bookname , red.Author , red.Publication , red.Pages, red.Statut, cat.CatName FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID ", function (error, resultSQL) {
        if (error)  {
            res.status(400).json({'message' : error});        
        }
        else {
            res.status(200);
            serieList =  resultSQL;
            console.log(readingList);
            res.json({reading:readingList});
        }
    });
}
exports.Search = function (req,res){
    let champ = req.params.Bookname;
    connection.query("SELECT red.ReadingID, FK_iduser, red.Bookname , red.Author , red.Publication , red.Pages, red.Statut cat.CatName FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID where Bookname = ?;", champ, function (error, resultSQL) {
    readingList =  resultSQL;
    console.log(resultSQL)
    res.json({reading:readingList});
    });
}
exports.Alire = function (req,res){
    connection.query("SELECT red.ReadingID, FK_iduser, red.Bookname , red.Author , red.Publication , red.Pages, red.Statut, cat.CatName FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID where red.Statut = 'A lire';", function (error, resultSQL) {
    readingList =  resultSQL;
    res.json({reading:readingist});
    });
}
exports.encours = function (req,res){
    connection.query("SELECT red.ReadingID, FK_iduser, red.Bookname , red.Author , red.Publication , red.Pages, red.Statut, cat.CatName FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID where red.Statut = 'En cours';", function (error, resultSQL) {
    readingList =  resultSQL;
    res.json({reading:readingist});
    });
}
exports.Finis = function (req,res){
    connection.query("SELECT red.ReadingID, FK_iduser, red.Bookname , red.Author , red.Publication , red.Pages, cat.CatName FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID where red.Statut = 'Fini';", function (error, resultSQL) {
    readingList =  resultSQL;
    res.json({reading:readingList});
    });
}
exports.addreading =  function(req, res) {
    let ReadingID = req.body.ReadingID;
    let Bookname =  req.body.Bookname;
    let Author = req.body.Author;
    let Publication = req.body.Publication;
    let Pages= req.body.Pages;
    let FK_CatégorieID = req.body.FK_CatégorieID;
    let FK_iduser = req.session.userid;
    let Statut = "En cours";
    let reading = new Reading(ReadingID, Bookname, Author, Publication, Pages, FK_CatégorieID, FK_iduser, Statut);
        console.log(reading);
        connection.query("INSERT INTO users.reading set ?", serie, function (error, resultSQL) {
            if(error) {
                res.status(400).json({'message' : error});    
            }
            else{
                res.status(200).json({'message' : 'success'});    
            }
        });
    }

 exports.updatereading =  function(req, res) {
    let ReadingID = req.body.ReadingID;
    let Bookname =  req.body.Bookname;
    let Author = req.body.Author;
    let Publication= req.body.Publication;
    let Pages= req.body.Pages;
    let FK_CatégorieID = req.body.FK_CatégorieID;
    let FK_iduser = req.session.userid;
    let Statut = req.body.Statut;
    let reading = new Reading(ReadingID, Bookname, Author, Publication, Pages, FK_CatégorieID, FK_iduser, Statut);
        console.log(reading);

        connection.query("UPDATE reading SET ? WHERE ReadingID = ?", [reading, req.params.ReadingID] , function (error, resultSQL) {
            if(error) {
                res.status(400).json({'message' : error});  
            }
            else{
                res.status(200).json({'message' : 'success'});   
            }
        });
    }
exports.readingRemove = function (request, response) {
    let ReadingID = request.params.ReadingID;
    console.log(ReadingID);
    connection.query( "DELETE from users.reading WHERE ReadingID = ?" , [ReadingID], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message' : error}); 
        }
        else{
            response.json({'message' : 'success'});   
        }
    }); 
 };
