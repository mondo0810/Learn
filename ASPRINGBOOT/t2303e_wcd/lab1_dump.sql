-- MySQL dump 10.13  Distrib 9.1.0, for Linux (x86_64)
--
-- Host: localhost    Database: lab1
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ClassRoom`
--

DROP TABLE IF EXISTS `ClassRoom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClassRoom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `teacherName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClassRoom`
--

LOCK TABLES `ClassRoom` WRITE;
/*!40000 ALTER TABLE `ClassRoom` DISABLE KEYS */;
INSERT INTO `ClassRoom` VALUES (1,'Lop1','Dothi'),(3,'TV BEST','cao thu');
/*!40000 ALTER TABLE `ClassRoom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `classRoom_id` int DEFAULT NULL,
  `classRoomId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn1g3abk7jiavrb1cs380ga2vb` (`classRoom_id`),
  CONSTRAINT `FKn1g3abk7jiavrb1cs380ga2vb` FOREIGN KEY (`classRoom_id`) REFERENCES `ClassRoom` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
INSERT INTO `Student` VALUES (6,'full street address','2024-11-08 20:00:26.064000','me@mydomain.com','my full name','(123) 456-7890',NULL,1),(7,'full street address','2024-11-08 20:25:27.392317','me@mydomain.com','my full name','(123) 456-7890',NULL,1),(8,'full street address','2024-11-08 20:46:43.782434','me@mydomain.com','my full name','(123) 456-7890',NULL,3),(9,'full street address','2024-11-08 20:44:36.989668','me@mydomain.com','my full name','(123) 456-7890',NULL,3);
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StudentResponse`
--

DROP TABLE IF EXISTS `StudentResponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StudentResponse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `classRoomName` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `ClassRoomId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StudentResponse`
--

LOCK TABLES `StudentResponse` WRITE;
/*!40000 ALTER TABLE `StudentResponse` DISABLE KEYS */;
/*!40000 ALTER TABLE `StudentResponse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StudentResponse_Subject`
--

DROP TABLE IF EXISTS `StudentResponse_Subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StudentResponse_Subject` (
  `StudentResponse_id` int NOT NULL,
  `subjects_id` int NOT NULL,
  PRIMARY KEY (`StudentResponse_id`,`subjects_id`),
  KEY `FK440w4j3h6qnk44i3ms8pvbwig` (`subjects_id`),
  CONSTRAINT `FK440w4j3h6qnk44i3ms8pvbwig` FOREIGN KEY (`subjects_id`) REFERENCES `Subject` (`id`),
  CONSTRAINT `FKsc9ajj9p27dmf5ogdui40qu0s` FOREIGN KEY (`StudentResponse_id`) REFERENCES `StudentResponse` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StudentResponse_Subject`
--

LOCK TABLES `StudentResponse_Subject` WRITE;
/*!40000 ALTER TABLE `StudentResponse_Subject` DISABLE KEYS */;
/*!40000 ALTER TABLE `StudentResponse_Subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Subject`
--

DROP TABLE IF EXISTS `Student_Subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Subject` (
  `Student_id` int NOT NULL,
  `subjects_id` int NOT NULL,
  PRIMARY KEY (`Student_id`,`subjects_id`),
  KEY `FKomfjg3j9p4ycpxsq90ntd1an4` (`subjects_id`),
  CONSTRAINT `FK4l18jc5k3j2gdi53hn1kns9a8` FOREIGN KEY (`Student_id`) REFERENCES `Student` (`id`),
  CONSTRAINT `FKomfjg3j9p4ycpxsq90ntd1an4` FOREIGN KEY (`subjects_id`) REFERENCES `Subject` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Subject`
--

LOCK TABLES `Student_Subject` WRITE;
/*!40000 ALTER TABLE `Student_Subject` DISABLE KEYS */;
/*!40000 ALTER TABLE `Student_Subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subject`
--

DROP TABLE IF EXISTS `Subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subject` (
  `id` int NOT NULL AUTO_INCREMENT,
  `credits` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subject`
--

LOCK TABLES `Subject` WRITE;
/*!40000 ALTER TABLE `Subject` DISABLE KEYS */;
INSERT INTO `Subject` VALUES (1,100,'Math'),(11,2323,'ds'),(12,32,'do thi');
/*!40000 ALTER TABLE `Subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subject_Student`
--

DROP TABLE IF EXISTS `Subject_Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subject_Student` (
  `Subject_id` int NOT NULL,
  `students_id` int NOT NULL,
  PRIMARY KEY (`Subject_id`,`students_id`),
  KEY `FKif0ph6yq5awnck5gsfwkg3vd1` (`students_id`),
  CONSTRAINT `FKif0ph6yq5awnck5gsfwkg3vd1` FOREIGN KEY (`students_id`) REFERENCES `Student` (`id`),
  CONSTRAINT `FKsb67uf8ol9d99gvvmdbqp1rpm` FOREIGN KEY (`Subject_id`) REFERENCES `Subject` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subject_Student`
--

LOCK TABLES `Subject_Student` WRITE;
/*!40000 ALTER TABLE `Subject_Student` DISABLE KEYS */;
/*!40000 ALTER TABLE `Subject_Student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-08 14:07:50
