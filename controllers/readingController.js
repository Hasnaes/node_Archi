let connection = require('../db');
let readingList = []; // Création d'un tableau reprenant la liste des lectures 
let Reading = require('../models/readingModel')


exports.mainpage = function (req,res){ //export=pouvoir réutiliser les fonctions autre part
    console.log(req.session)
    connection.query("SELECT red.ReadingID, red.FK_iduser, red.Bookname , red.Author , red.Publication,red.Pages, red.Statut, cat.CatName FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID where red.FK_iduser = ?", req.session.userid, function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error); //400=error       
        }
        else {
            res.status(200); //200: Ok pas d'erreur
            readingList =  resultSQL;
            console.log(readingList);
            res.render('mainpage.ejs', {reading:readingList}); // render= vers une page ejs
        }
    });
}
exports.Search = function (req,res){
    let champ = req.query.Search;
    connection.query("SELECT red.ReadingID, red.FK_iduser, red.Bookname, red.Author , red.Publication, red.Pages, red.Statut, cat.CatName FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID where Bookname = ? ",champ, function (error, resultSQL) {
    readingList =  resultSQL;
    console.log(resultSQL)
    res.render('mainpage.ejs', {reading:readingList});
    });
}
exports.Alire = function (req,res){
    connection.query("SELECT red.ReadingID, red.FK_iduser, red.Bookname, red.Author , red.Publication, red.Pages, red.Statut, cat.CatName FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID where red.Statut = 'A lire' AND red.FK_iduser = ? ;",req.session.userid, function (error, resultSQL) {
    readingList =  resultSQL;
    res.render('mainpage.ejs', {reading:readingList});
    });
}
exports.encours = function (req,res){
    connection.query("SELECT red.ReadingID, red.FK_iduser, red.Bookname, red.Author , red.Publication, red.Pages, red.Statut, cat.CatName FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID where red.Statut = 'En cours' AND red.FK_iduser = ? ;",req.session.userid, function (error, resultSQL) {
    readingList =  resultSQL;
    res.render('mainpage.ejs', {reading:readingList});
    });
}
exports.Lu = function (req,res){
    connection.query("SELECT red.ReadingID, red.FK_iduser, red.Bookname, red.Author , red.Publication,red.Pages, red.Statut, cat.CatName FROM users.reading red inner join users.catégorie cat on red.FK_catégorieID = cat.CatégorieID where red.Statut = 'Lu'  AND red.FK_iduser = ?;",req.session.userid, function (error, resultSQL) {
    readingList =  resultSQL;
    res.render('mainpage.ejs', {reading:readingList});
    });
}
exports.readingFormAdd = function(req, res) { //fonction liée à la route qui emmène vers le formulaire
    res.render('readingAdd.ejs', {Bookname:"", Author:"", Publication:"", Pages:"", FK_CatégorieID:"", CatName :""});
}
exports.readingnew =  function(req, res) {
    let ReadingID = req.body.ReadingID;
    let Bookname =  req.body.Bookname;
    let Author = req.body.Author;
    let Publication = req.body.Publication;
    let Pages = req.body.Pages;
    let FK_CatégorieID = req.body.FK_CatégorieID;
    let FK_iduser = req.session.userid;
    let Statut = "En cours"; //automatiquement en cours lors de l'ajout d'un livre 
    let reading = new Reading(ReadingID, Bookname, Author, Publication, Pages, FK_CatégorieID, FK_iduser, Statut);
        console.log(reading);
        connection.query("INSERT INTO users.reading set ?", reading, function (error, resultSQL) {
            if(error) {
                res.status(400).send(error);
            }
            else{
                console.log(req.session.userid);
                res.status(201).redirect('/mainpage');
            }
        });
    }

 exports.updatereading =  function(req, res) {
    let ReadingID = req.body.ReadingID;
    let Bookname =  req.body.Bookname;
    let Author = req.body.Author;
    let Publication = req.body.Publication;
    let Pages = req.body.Pages;
    let FK_CatégorieID = req.body.FK_CatégorieID;
    let FK_iduser = req.session.userid;
    let Statut = req.body.Statut;
    let reading = new Reading(ReadingID, Bookname, Author, Publication, Pages, FK_CatégorieID, FK_iduser, Statut);
        console.log(reading);

        connection.query("UPDATE reading SET ? WHERE ReadingID = ?", [reading, ReadingID] , function (error, resultSQL) {
            if(error) {
                res.status(400).send(error);
            }
            else{
                res.status(201).redirect('/mainpage');
            }
        });
    }
// Send user form update
exports.readingFormUpdate = function (request, response) {
    let ReadingID = request.params.ReadingID;
    connection.query("SELECT red.ReadingID, red.FK_iduser, red.Bookname, red.Author , red.Publication,red.Pages, red.Statut, red.FK_CatégorieID, cat.CatName FROM users.reading red inner join users.catégorie cat on red.FK_CatégorieID = cat.CatégorieID where red.ReadingID = ?", ReadingID ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            reading = resultSQL;
            response.render('updatereading.ejs', {ReadingID:reading[0].ReadingID, Bookname:reading[0].Bookname, Author:reading[0].Author, Publication:reading[0].Publication, Pages:reading[0].Pages, FK_CatégorieID:reading[0].FK_CatégorieID, FK_iduser:reading[0].FK_iduser, Statut:reading[0].Statut});
        }
    });
    console.log(readingList); 
}
exports.readingRemove = function (request, response) {
    let ReadingID = request.params.ReadingID;
    console.log(ReadingID);
    connection.query( "DELETE from users.reading WHERE ReadingID = ?" , [ReadingID], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/mainpage');
        }
    }); 
 };
 exports.readingFormRemove = function (request, response) {
    let ReadingID = request.params.ReadingID;
    connection.query("Select * from reading WHERE ReadingID = ?", ReadingID ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            reading = resultSQL;
            response.render('removereading.ejs', {ReadingID:reading[0].ReadingID, Bookname:reading[0].Bookname, Author:reading[0].Author, Publication:reading[0].Publication, Pages:reading[0].Pages, FK_CatégorieID:reading[0].FK_CatégorieID});
        }
    });
    console.log(readingList); 
}