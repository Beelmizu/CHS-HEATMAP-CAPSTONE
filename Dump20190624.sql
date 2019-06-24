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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `account` (
  `acc_id` int(11) NOT NULL AUTO_INCREMENT,
  `acc_username` varchar(20) NOT NULL,
  `acc_password` varchar(45) NOT NULL,
  `acc_fullname` varchar(45) NOT NULL,
  `acc_email` varchar(45) NOT NULL,
  `acc_gender` int(1) NOT NULL,
  `acc_phone` varchar(11) DEFAULT NULL,
  `acc_role` tinyint(4) NOT NULL,
  `acc_date_created` varchar(255) NOT NULL,
  `acc_date_updated` varchar(255) DEFAULT NULL,
  `acc_status` varchar(10) DEFAULT NULL,
  `acc_updated_by` varchar(20) DEFAULT NULL,
  `cpn_acc_id` int(11) NOT NULL,
  PRIMARY KEY (`acc_id`),
  KEY `cpn_acc_id` (`cpn_acc_id`),
  CONSTRAINT `cpn_acc_id` FOREIGN KEY (`cpn_acc_id`) REFERENCES `company` (`cpn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'cuongdq','12345','Do Cuong','qcuong2511@gmail.com',0,'0904635563',1,'2019-06-12T12:35:06.732',NULL,'active',NULL,1),(2,'camdq','1234','Do Quoc Cam','qcam123@gmail.com',0,'01213855665',0,'2019-06-12T12:35:53.780','2019-06-24T09:50:35.248','active','cuongdq',2),(3,'tannm','1234','Ngo Minh Tan','tannm@gmail.com',0,'01213744556',0,'2019-06-12T12:36:34.703','2019-06-24T09:40:51.167','active',NULL,1),(4,'cuongpg1','1234','Phan Gia Cuong','cuongpg123@gmail.com',0,'01252266332',0,'2019-06-12T12:37:16.409','2019-06-24T09:41:07.103','inactive','cuongdq',1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_store`
--

DROP TABLE IF EXISTS `account_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `account_store` (
  `acc_sto_id` int(4) NOT NULL AUTO_INCREMENT,
  `acc_sto_date_created` varchar(255) NOT NULL,
  `acc_sto_date_updated` varchar(255) DEFAULT NULL,
  `acc_sto_updated_by` varchar(45) DEFAULT NULL,
  `account_id` int(4) NOT NULL,
  `store_id` int(4) NOT NULL,
  PRIMARY KEY (`acc_sto_id`),
  KEY `account_id_idx` (`account_id`),
  KEY `store_id_idx` (`store_id`),
  CONSTRAINT `account_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`acc_id`),
  CONSTRAINT `store_id` FOREIGN KEY (`store_id`) REFERENCES `store` (`sto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_store`
--

LOCK TABLES `account_store` WRITE;
/*!40000 ALTER TABLE `account_store` DISABLE KEYS */;
INSERT INTO `account_store` VALUES (1,'2019-06-12T12:35:06.732',NULL,NULL,2,1),(2,'2019-06-12T12:35:06.732',NULL,NULL,2,2),(3,'2019-06-12T12:35:06.732',NULL,NULL,3,2),(4,'2019-06-12T12:35:06.732',NULL,NULL,2,3);
/*!40000 ALTER TABLE `account_store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `area` (
  `area_id` int(11) NOT NULL AUTO_INCREMENT,
  `area_floor` int(11) NOT NULL,
  `area_name` varchar(20) NOT NULL,
  `area_date_created` varchar(255) NOT NULL,
  `area_date_updated` varchar(255) DEFAULT NULL,
  `area_status` varchar(10) DEFAULT NULL,
  `area_updated_by` varchar(45) DEFAULT NULL,
  `sto_id` int(11) NOT NULL,
  PRIMARY KEY (`area_id`),
  KEY `sto_id_idx` (`sto_id`),
  CONSTRAINT `sto_id` FOREIGN KEY (`sto_id`) REFERENCES `store` (`sto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,1,'Ban Lon','2019-06-13T12:41:27.122',NULL,'inactive',NULL,1),(2,1,'Ngoai Troi','2019-06-13T12:41:27.122',NULL,'active',NULL,1),(3,2,'Cau Thang','2019-06-13T12:41:27.122',NULL,'active',NULL,1),(4,2,'Ban Tron','2019-06-12T13:16:19.739','2019-06-24T10:05:37.492','active','cuongdq',1),(5,2,'Phong Hop','2019-06-14T10:51:56.605','2019-06-24T09:56:24.533','active','cuongdq',1);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company` (
  `cpn_id` int(11) NOT NULL AUTO_INCREMENT,
  `cpn_name` varchar(45) NOT NULL,
  `cpn_address` varchar(45) NOT NULL,
  `cpn_date_created` varchar(255) NOT NULL,
  `cpn_date_updated` varchar(255) DEFAULT NULL,
  `cpn_status` varchar(10) DEFAULT NULL,
  `cpn_updated_by` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cpn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Passio','123 Quang Trung Quan 12','2019-06-12T12:19:04.637','2019-06-24T09:50:13.558','inactive','cuongdq'),(2,'KFC','321 Dien Bien Phu Quan 3','2019-06-12T12:20:05.419','2019-06-14T11:49:19.808','active','cuongdq'),(3,'Lotteria','432 Ham Nghi Quan 1','2019-06-12T12:20:28.083',NULL,'active',NULL),(4,'Cheese Coffee','123 Dinh Tien Hoang Quan Binh Thanh','2019-06-12T12:27:16.039',NULL,'active',NULL);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `heatmap`
--

DROP TABLE IF EXISTS `heatmap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `heatmap` (
  `htm_id` int(11) NOT NULL,
  `htm_matrix` varchar(2000) NOT NULL,
  `htm_time` varchar(255) NOT NULL,
  `htm_cam_id` int(11) NOT NULL,
  PRIMARY KEY (`htm_id`),
  KEY `cam_id_idx` (`htm_cam_id`),
  CONSTRAINT `htm_cam_id` FOREIGN KEY (`htm_cam_id`) REFERENCES `camera` (`cam_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heatmap`
--

LOCK TABLES `heatmap` WRITE;
/*!40000 ALTER TABLE `heatmap` DISABLE KEYS */;
/*!40000 ALTER TABLE `heatmap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `report` (
  `rep_id` int(11) NOT NULL AUTO_INCREMENT,
  `rep_time` varchar(20) NOT NULL,
  `rep_count` int(11) NOT NULL,
  `rep_cam_id` int(11) NOT NULL,
  PRIMARY KEY (`rep_id`),
  KEY `cam_id_idx` (`rep_cam_id`),
  CONSTRAINT `rep_cam_id` FOREIGN KEY (`rep_cam_id`) REFERENCES `camera` (`cam_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `store` VALUES (1,'Passio Quan 3','222 Phan Van Tri Quan Binh Thanh','09046355215','2019-06-12T12:41:27.122','2019-06-24T09:55:52.986','active','cuongdq',1),(2,'Passio Quan 1','123 Le Duan Quan 1','01213554667','2019-06-12T12:42:11.467','2019-06-24T09:56:00.385','inactive','cuongdq',1),(3,'Passio Quan Phu Nhuan','555 Tran Huy Lieu Quan Phu Nhuan','0936765256','2019-06-12T12:42:41.865',NULL,'active',NULL,1),(4,'KFC Quan 1','123 Ham Nghi Quan 1','01213556774','2019-06-12T12:43:18.215',NULL,'active',NULL,2);
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

-- Dump completed on 2019-06-24 16:06:18
