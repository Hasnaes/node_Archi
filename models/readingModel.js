class Reading { // création d'un objet 'Reading'
    ReadingID ="";
    Bookname = "";
    Author ="";
    Publication ="";
    Pages="";
    FK_CatégorieID ="";
    FK_iduser ="";
    Statut ="";

    constructor(ReadingID, Bookname, Author, Publication, Pages, FK_CatégorieID, FK_iduser, Statut)
    {
        this.ReadingID = ReadingID;
        this.Bookname = Bookname;
        this.Author = Author;
        this.Publication = Publication;
        this.Pages = Pages;
        this.FK_CatégorieID = FK_CatégorieID;
        this.FK_iduser = FK_iduser;
        this.Statut = Statut;
    }
    
};

module.exports = Reading;