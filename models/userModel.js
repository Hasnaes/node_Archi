class User { // modèle importé dans userController
    userid = "";
    name ="";
    email ="";
    password = "";
    constructor(userid,name, email, password)
    {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    
};

module.exports = User;