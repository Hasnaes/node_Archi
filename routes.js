// Get an instance of the express Router and set routes
let express = require('express'); // require renvoit à une bibliothéque node.js
let router = express.Router();   

// création des variables 'controller' qui renvoit à des routes 
var userController = require('./controllers/userController');// renvoit au module 'userController.js
var userApiController = require('./controllers/userApiController');
var readingController = require('./controllers/readingController');
var readingApiController = require('./controllers/readingApiController');
var categorieController = require('./controllers/categorieController');
var categorieApiController = require('./controllers/categorieApiController')

const check = (req, res, next) => { // req et res correspondent aux paramètres de fonction Callback
    //condition pour accès session
    if(req.session && req.session.userid >= 0){ //&&--> ET
        next();
    }
    else{
        res.send('Acces denied');
    }
};

//le get permet de récupérer les paramètres de la requête
router.get('/', (request, response) => response.redirect('/loginPage'));

// Routes liées aux READING

router.get('/mainpage',check, readingController.mainpage);
router.get('/readingadd', readingController.readingFormAdd);
router.post('/readingnew', readingController.readingnew);
router.get('/updateformreading/:ReadingID', readingController.readingFormUpdate);
router.post ('/updatereading', readingController.updatereading);
router.get('/deleteformreading/:ReadingID', readingController.readingFormRemove);
router.post('/deletereading/:ReadingID', readingController.readingRemove);
router.get('/Search', readingController.Search);
router.get ('/Alire',readingController.Alire);
router.get('/EnCours', readingController.encours);
router.get('/Finis', readingController.Lu);

// Route API READING
router.get('/Api/mainpage', readingApiController.mainpage);
router.get('/Api/Search/:Bookname', readingApiController.Search);
router.get('/Api/Alire', readingApiController.Alire);
router.get('/Api/EnCours', readingApiController.encours);
router.get('/Api/Lu', readingApiController.Lu);
router.post('/Api/readingnew', readingApiController.readingnew);
router.put('/Api/updatereading/:ReadingID', readingApiController.updatereading);
router.delete('/Api/deletereading/:ReadingID', readingApiController.readingRemove);

// Routes liées aux CATEGORIES
router.get('/categoriereading', categorieController.listeCatreading);
router.get('/addcategorie', categorieController.catFormAddreading);
router.get('/categoriefiltre/:CatName', categorieController.catfiltre);
router.post('/newcatreading', categorieController.addcatreading);
router.get('/categoriename', categorieController.categoriename);

// Route API CATEGORIE
router.get('/Api/categoriereading', categorieApiController.listeCatreading);
router.get('/Api/categoriefiltre/:CatName', categorieApiController.catfiltre);
router.post('/Api/newcatreading', categorieApiController.addcatreading);
router.get('/Api/categoriename', categorieApiController.categoriename);

// Route User
router.get('/register', userController.userFormadd);
router.post('/auth_register', userController.register);
router.get ('/loginPage', userController.loginpage);
router.post('/auth_login', userController.login);
router.post('/userRemove', userController.userRemove);
router.get('/confirm', userController.confirm); //form 
router.get('/userFormUpdate', userController.UpdateFormUser);
router.post('/userUpdate/:userid', userController.updateUser);

// Routes User
router.get('/Api/user', userApiController.listuser);
router.post('/Api/auth_register', userApiController.register);
router.delete('/Api/userRemove/:userid', userApiController.userRemove);

module.exports = router;