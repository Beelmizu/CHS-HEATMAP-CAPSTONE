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
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `store` (
  `sto_id` int(11) NOT NULL AUTO_INCREMENT,
  `sto_name` varchar(45) NOT NULL,
  `sto_address` varchar(45) NOT NULL,
  `sto_phone` varchar(11) NOT NULL,
  `sto_date_created` varchar(255) NOT NULL,
  `sto_date_updated` varchar(255) DEFAULT NULL,
  `sto_status` varchar(10) DEFAULT NULL,
  `sto_update_by` varchar(45) DEFAULT NULL,
  `cpn_store_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sto_id`),
  KEY `com_id_idx` (`cpn_store_id`),
  CONSTRAINT `cpn_store_id` FOREIGN KEY (`cpn_store_id`) REFERENCES `company` (`cpn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'Passio Quan 3','222 Phan Van Tri Quan Binh Thanh','09046355215','2019-06-12T12:41:27.122',NULL,'active',NULL,1),(2,'Passio Quan 1','123 Le Duan Quan 1','01213554667','2019-06-12T12:42:11.467',NULL,'inactive',NULL,1),(3,'Passio Quan Phu Nhuan','555 Tran Huy Lieu Quan Phu Nhuan','0936765256','2019-06-12T12:42:41.865',NULL,'active',NULL,1),(4,'KFC Quan 1','123 Ham Nghi Quan 1','01213556774','2019-06-12T12:43:18.215',NULL,'active',NULL,2);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-14 15:33:03
