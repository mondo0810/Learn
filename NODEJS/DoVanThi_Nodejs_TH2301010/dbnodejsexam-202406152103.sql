
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ProductCode` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ProductName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ProductDate` date DEFAULT NULL,
  `ProductOriginPrice` decimal(10,2) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `ProductStoreCode` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `product` VALUES (1,'A12','Iphone','2024-06-19',500000.00,23,'S10'),(2,'A13','Product 1','2024-06-18',500000.00,23,'S18'),(3,'A12','Samsung','2024-06-17',500000.00,23,'S90'),(4,'A15','Product 1','2024-06-17',300000.00,25,'S10'),(5,'A12','Product 1','2024-06-19',500000.00,23,'S11'),(6,'A12','Product 1','2024-06-18',500000.00,23,'S56');
