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
  `acc_password` varchar(255) NOT NULL,
  `acc_fullname` varchar(45) DEFAULT NULL,
  `acc_email` varchar(45) DEFAULT NULL,
  `acc_gender` int(1) DEFAULT NULL,
  `acc_phone` varchar(11) DEFAULT NULL,
  `acc_role` tinyint(4) DEFAULT NULL,
  `acc_date_created` varchar(255) NOT NULL,
  `acc_date_updated` varchar(255) DEFAULT NULL,
  `acc_status` varchar(10) DEFAULT NULL,
  `acc_updated_by` varchar(20) DEFAULT NULL,
  `cpn_acc_id` int(11) NOT NULL,
  PRIMARY KEY (`acc_id`),
  KEY `cpn_acc_id` (`cpn_acc_id`),
  CONSTRAINT `cpn_acc_id` FOREIGN KEY (`cpn_acc_id`) REFERENCES `company` (`cpn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'cuongdq','1234567','Do Cuong','qcuong2511@gmail.com',0,'0904635563',1,'2019-06-12T12:35:06.732',NULL,'active',NULL,1),(2,'camdq','12345671','Do Quoc Cam','qcam12345@gmail.com',0,'0121385567',0,'2019-06-12T12:35:53.780','2019-08-03T16:03:12.071','active','cuongdq',2),(3,'tannm','$2a$10$b66TYVKhRzQijMuA0OoZkuq1J/QMWZoWgpY0PIveQYrKGUjiTMu.e','Ngo Minh Tan','tannm@gmail.com',0,'0121374451',0,'2019-06-12T12:36:34.703','2019-08-05T15:19:34.832','active','tytn',1),(4,'cuongpg1','1234567','Phan Gia Cuong','cuongpg123@gmail.com',0,'0125226633',0,'2019-06-12T12:37:16.409','2019-07-02T14:38:10.648','active','cuongdq',1),(5,'tytn','$2a$10$V9/zNblIU0l0lN2O55Ry6OnY35d1JQeZ1n03mA0863dEy4OVlH6Cu','Tran Ngoc Ty','tytn@gmail.com',0,'0121385566',1,'2019-07-05T11:37:53.171','2019-08-07T19:19:57.362','active','tytn',2),(6,'cuongdqse','$2a$10$YuM3EjbDzT9Rlg5sVVijQ.9Lppm1YTyiEkVR3tDWfufWgcer5b7iC','Do Quoc Cuong','qcuong251196@gmail.com',0,'0904635563',1,'2019-07-24T00:20:41.350','2019-08-01T22:59:42.866','active','cuongdqse',1),(7,'khanhdq','$2a$10$ztAbCTjX36EOydUbmZJHeehyTVbs.vBEupemy2csgSXpWGu567GVu','Do Quoc Khanh','qkhanh2805@gmail.com',0,'0913664742',0,'2019-07-25T09:32:18.514','2019-08-05T15:24:13.402','active','khanhdq',1),(8,'tuyennq','$2a$10$I0ZQxbbxP1y0vErWyS4Ui.hqdDD8br.cdmF1XrVAhGOb6mm3hLfL6','Tuyen Nguyen','tuyentn@gmail.com',0,'0904635221',0,'2019-07-25T09:55:43.691','2019-08-05T16:26:24.786','active','tytn',1),(9,'huyvg','$2a$10$I105KliBejOwfzaqTlawZuXvXKvaNphYHxjbxF.WSti5wngbi4HxO','Vo Gia Huy','huyvg@gmail.com',0,'0904635522',1,'2019-08-01T18:45:36.116','2019-08-01T18:45:44.593','active','cuongdqse',4),(10,'thanhpn','$2a$10$hXaW2fgdRxTSHA/ODFRNQOTUm.LNFnJ2EtuO6MXE6L9uLlY0MJOp2','Nhut Thanh','aa@fpt.edu.vn',0,'8490465553',0,'2019-08-01T23:26:58.450',NULL,'active',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_store`
--

LOCK TABLES `account_store` WRITE;
/*!40000 ALTER TABLE `account_store` DISABLE KEYS */;
INSERT INTO `account_store` VALUES (1,'2019-06-12T12:35:06.732',NULL,NULL,3,1),(3,'2019-06-12T12:35:06.732',NULL,NULL,3,2),(4,'2019-06-12T12:35:06.732',NULL,NULL,5,3),(5,'2019-06-12T12:35:06.732',NULL,NULL,7,1),(6,'2019-06-12T12:35:06.732',NULL,NULL,7,5),(7,'2019-06-12T12:35:06.732',NULL,NULL,7,2),(16,'2019-08-03T15:59:25.953',NULL,NULL,4,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,1,'Ban Tron Tang 1','2019-06-13T12:41:27.122',NULL,'active',NULL,1),(2,2,'Ban Tron Tang 2','2019-06-13T12:41:27.122','2019-08-11T11:22:10.586','inactive','tytn',1),(3,1,'Ngoai Troi','2019-06-13T12:41:27.122','2019-08-11T11:15:38.880','active','tytn',1),(4,2,'Ngoai Troi Tang 2','2019-06-12T13:16:19.739','2019-08-11T11:22:07.706','inactive','tytn',1),(5,2,'Phong Hop','2019-06-14T10:51:56.605','2019-06-24T09:56:24.533','active','cuongdq',2),(6,2,'Cau Thang Tang 2','2019-06-14T10:51:56.605','2019-08-11T11:22:04.597','inactive','tytn',1);
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
  `cam_image_url` longtext,
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Ngoc Lan Coffee','276 Phan Van Tri Quan Binh Thanh','2019-06-12T12:19:04.637','2019-07-02T09:19:01.861','active','cuongdq'),(2,'KFC','321 Dien Bien Phu Quan 3','2019-06-12T12:20:05.419','2019-06-14T11:49:19.808','active','cuongdq'),(3,'Lotteria','432 Ham Nghi Quan 1','2019-06-12T12:20:28.083',NULL,'active',NULL),(4,'Cheese Coffee','123 Dinh Tien Hoang Quan Binh Thanh','2019-06-12T12:27:16.039',NULL,'active',NULL),(5,'Milano Coffee','123 Hai Ba Trung Quan 3','2019-07-29T09:20:50.858',NULL,'active','cuongdqse'),(6,'Trung Nguyen Coffee','121 Phan Van Tri Quan Binh Thanh','2019-07-29T09:26:03.371',NULL,'active','cuongdqse');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `report` (
  `rep_id` int(11) NOT NULL AUTO_INCREMENT,
  `rep_time` varchar(255) DEFAULT NULL,
  `rep_count` int(11) DEFAULT NULL,
  `rep_heatmap` longtext,
  `rep_people_gender` longtext,
  `rep_people_age` longtext,
  `rep_cam_id` int(11) NOT NULL,
  PRIMARY KEY (`rep_id`),
  KEY `cam_id_idx` (`rep_cam_id`),
  CONSTRAINT `rep_cam_id` FOREIGN KEY (`rep_cam_id`) REFERENCES `camera` (`cam_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1902 DEFAULT CHARSET=latin1;
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
  `sto_phone` varchar(11) DEFAULT NULL,
  `sto_date_created` varchar(255) NOT NULL,
  `sto_date_updated` varchar(255) DEFAULT NULL,
  `sto_status` varchar(10) DEFAULT NULL,
  `sto_update_by` varchar(45) DEFAULT NULL,
  `cpn_store_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sto_id`),
  KEY `com_id_idx` (`cpn_store_id`),
  CONSTRAINT `cpn_store_id` FOREIGN KEY (`cpn_store_id`) REFERENCES `company` (`cpn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'Ngoc Lan Quan Binh Thanh','222 Phan Van Tri Quan Binh Thanh','0904635521','2019-06-12T12:41:27.122','2019-06-24T09:55:52.986','active','cuongdq',1),(2,'Ngoc Lan Quan 1','123 Le Duan Quan 1','0121355466','2019-06-12T12:42:11.467','2019-07-09T13:35:22.589','active','cuongdq',1),(3,'KFC Quan Phu Nhuan','555 Tran Huy Lieu Quan Phu Nhuan','0936765256','2019-06-12T12:42:41.865',NULL,'active',NULL,2),(4,'KFC Quan 1','123 Ham Nghi Quan 1','0121355677','2019-06-12T12:43:18.215',NULL,'active',NULL,2),(5,'Ngoc Lan Quan Go Vap','276 Phan Van Tri Quan Go Vap','0904635563','2019-07-28T22:46:16.529','2019-08-03T15:03:22.272','active','tytn',1),(8,'Ngoc Lan Quan 12','123 To Ky Quan 12','0903674456','2019-07-31T00:51:54.037','2019-08-03T16:03:33.605','active','cuongdqse',1);
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

-- Dump completed on 2019-08-12 19:41:48