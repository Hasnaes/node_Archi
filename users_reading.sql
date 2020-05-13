-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: users
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reading`
--

DROP TABLE IF EXISTS `reading`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reading` (
  `ReadingID` int NOT NULL AUTO_INCREMENT,
  `Bookname` varchar(100) DEFAULT NULL,
  `Author` varchar(45) DEFAULT NULL,
  `Publication` int DEFAULT NULL,
  `Pages` int DEFAULT NULL,
  `FK_CatégorieID` int DEFAULT NULL,
  `FK_iduser` int DEFAULT NULL,
  `Statut` enum('En cours','A lire','Lu') DEFAULT NULL,
  PRIMARY KEY (`ReadingID`),
  KEY `Reading ID` (`ReadingID`),
  KEY `Fkcat_idx` (`FK_CatégorieID`),
  KEY `Fk_iduser_idx` (`FK_iduser`),
  CONSTRAINT `Fk_CategoryID` FOREIGN KEY (`FK_CatégorieID`) REFERENCES `catégorie` (`CatégorieID`),
  CONSTRAINT `Fk_iduser` FOREIGN KEY (`FK_iduser`) REFERENCES `user` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reading`
--

LOCK TABLES `reading` WRITE;
/*!40000 ALTER TABLE `reading` DISABLE KEYS */;
INSERT INTO `reading` VALUES (9,'Les Fleurs du mal','Charles Baudelaire',1857,288,NULL,NULL,'A lire'),(10,'L\'Assommoir','Emile Zola',1877,576,1,NULL,'En cours'),(11,'Ulysse from Bagdad','Eric-Emannuel Schmitt',2008,309,1,2,'Lu'),(21,'Les innovateurs','Walter Isaacson',2014,860,2,NULL,'A lire'),(25,'Brûlée vive','Souad',2003,224,1,2,'Lu'),(26,'Devenir','Michelle Obama',2018,448,3,2,'En cours'),(27,'Aimer, croire et devenir','Myriam Lakhdar ',2017,345,2,2,'A lire'),(28,'Mille soleils splendides','Khaled Hosseini',2007,250,1,2,'A lire'),(29,'Esclave des milices libyens','Alpha Kaba',2019,208,3,NULL,'Lu'),(30,'La fille du train','Paula Hawkins',2016,456,1,22,'En cours'),(31,'Ta vie commence ','Raphaëlle Giordano ',2017,256,1,22,'Lu'),(46,'Bijour','Emile Zola',1877,576,3,NULL,'En cours'),(57,'Vivre ou mourir','Charles Baudelaire',1897,NULL,1,NULL,'En cours'),(60,'Devenirrrr','Test ajout json',2020,458,3,NULL,'En cours'),(62,'La belle et le clochard','Walt Disney',1909,690,2,NULL,'En cours');
/*!40000 ALTER TABLE `reading` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-13 22:12:17
