-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: heatmapsystem
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `camera`
--

DROP TABLE IF EXISTS `camera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `camera` (
  `cam_id` int(11) NOT NULL AUTO_INCREMENT,
  `cam_ip` varchar(20) NOT NULL,
  `cam_account` varchar(45) NOT NULL,
  `cam_password` varchar(45) NOT NULL,
  `cam_date_created` varchar(255) NOT NULL,
  `cam_date_updated` varchar(255) DEFAULT NULL,
  `cam_status` varchar(10) DEFAULT NULL,
  `cam_updated_by` varchar(45) DEFAULT NULL,
  `cam_area_id` int(11) NOT NULL,
  PRIMARY KEY (`cam_id`),
  KEY `area_id_idx` (`cam_area_id`),
  CONSTRAINT `cam_area_id` FOREIGN KEY (`cam_area_id`) REFERENCES `area` (`area_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camera`
--

LOCK TABLES `camera` WRITE;
/*!40000 ALTER TABLE `camera` DISABLE KEYS */;
INSERT INTO `camera` VALUES (1,'192.168.12.33','cuongdq','1234','2019-06-13T12:41:27.122','2019-06-12T13:35:19.054','inactive','cuongdq',1),(2,'192.168.3.1','cuongdq','1234','2019-06-13T12:41:27.122',NULL,'active',NULL,1),(3,'192.168.2.3','cuongdq','1234','2019-06-13T12:41:27.122',NULL,'active',NULL,2),(4,'192.168.3.2','cuongdq','1234','2019-06-13T12:41:27.122',NULL,'active',NULL,2),(5,'192.168.3.2','cuongdq','1234','2019-06-13T12:41:27.122',NULL,'inactive',NULL,2),(6,'192.168.12.53','cuongdq','1234','2019-06-12T13:38:00.717',NULL,'active',NULL,1),(7,'192.168.12.553','tannm','1234','2019-06-12T13:38:39.589',NULL,'inactive',NULL,1),(8,'192.168.3.3','huyvt123','1234','2019-06-14T12:26:13.331','2019-06-14T12:26:32.154','inactive','cuongdq',1);
/*!40000 ALTER TABLE `camera` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-14 15:33:02
