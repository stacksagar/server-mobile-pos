-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 04, 2024 at 05:03 AM
-- Server version: 10.6.16-MariaDB
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `livexdomainhost_mobilepos_v2`
--

-- --------------------------------------------------------

--
-- Table structure for table `barcodes`
--

CREATE TABLE `barcodes` (
  `id` int(11) NOT NULL,
  `barcode` varchar(250) DEFAULT NULL,
  `barcodes` longtext DEFAULT NULL,
  `quantity` int(11) DEFAULT 0,
  `with_multi` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customerhistories`
--

CREATE TABLE `customerhistories` (
  `id` int(11) NOT NULL,
  `paid` float DEFAULT 0,
  `due` float DEFAULT 0,
  `total` float DEFAULT 0,
  `quantity` float DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` float NOT NULL,
  `type` enum('amount','percentage') NOT NULL DEFAULT 'amount',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expensecategories`
--

CREATE TABLE `expensecategories` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `slug` varchar(60) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `cost` float DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `content` text DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `paymentmethods`
--

CREATE TABLE `paymentmethods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `wallet` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `values` longtext DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productcategories`
--

CREATE TABLE `productcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `slug` varchar(60) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `sale_price` float DEFAULT 0,
  `purchase_price` float DEFAULT 0,
  `total_sale` int(11) DEFAULT 0,
  `in_stock` int(11) DEFAULT 0,
  `total_purchase_amount` float DEFAULT 0,
  `total_sale_amount` float DEFAULT 0,
  `thumbnail` varchar(255) DEFAULT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `details` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `images` longtext DEFAULT '[]',
  `custom` longtext DEFAULT '{}',
  `variants` longtext DEFAULT '[]',
  `with_variant` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `due` float DEFAULT 0,
  `paid` float DEFAULT 0,
  `discount` float DEFAULT 0,
  `vat` float DEFAULT 0,
  `quantity` float DEFAULT 0,
  `total` float DEFAULT 0,
  `total_purchase_cost` float DEFAULT 0,
  `method` varchar(255) DEFAULT 'cash',
  `with_variant` tinyint(1) DEFAULT 0,
  `properties` longtext DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `client` longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `admin` longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `client`, `admin`, `createdAt`, `updatedAt`) VALUES
(1, '{\n    \"header_logo\": \"https://mobilepos.live.xdomainhost.com/cb052ea350c-pngegg.png\",\n    \"favicon\": \"https://mobilepos.live.xdomainhost.com/095180cea0b-OIP.jpeg\",\n    \"site_title\": \"Mobile Shop Management\",\n    \"banners\": [\n        {\n            \"img\": \"https://mobilepos.live.xdomainhost.com/85e2b9b9335-LqVyXMomfN49D2D7YKnuS-1200-80.jpg\",\n            \"link\": \"#\"\n        }\n    ],\n    \"banner_width\": \"\",\n    \"footer_logo\": \"https://mobilepos.live.xdomainhost.com/5e2b9b93359-pngegg.png\",\n    \"footer_description\": \"\\\"Obtain the most competitive price when you buy a mobile device. Enjoy the best price and stellar service from our mobile store.\\\"\",\n    \"copyright\": \"Â©MobileShop 2023 All Rights Reserved...\",\n    \"location\": \"Dhaka Bangladesh\",\n    \"email\": \"contact@gmail.com\",\n    \"phone\": \"01383882333\",\n    \"facebook\": \"https://www.facebook.com/username\",\n    \"linkedin\": \"https://www.linkedin.com/in/username\",\n    \"youtube\": \"https://www.youtube.com/@username\",\n    \"twitter\": \"https://twitter.com/username\"\n}', NULL, '2023-12-27 03:16:28', '2024-01-31 07:38:11');

-- --------------------------------------------------------

--
-- Table structure for table `supplierandproductrelation`
--

CREATE TABLE `supplierandproductrelation` (
  `id` int(11) NOT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `SupplierId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplierhistories`
--

CREATE TABLE `supplierhistories` (
  `id` int(11) NOT NULL,
  `paid_amount` float DEFAULT NULL,
  `due_amount` float DEFAULT NULL,
  `total_purchase_amount` float DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `supplierId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `supplier_name` varchar(255) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `nid` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `total_puchase_amount` float DEFAULT NULL,
  `total_paid` float DEFAULT NULL,
  `total_due` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `due` float DEFAULT 0,
  `paid` float DEFAULT 0,
  `total_puchase_amount` float DEFAULT 0,
  `is_customer` tinyint(1) DEFAULT 0,
  `role` enum('user','custom','moderator','admin') DEFAULT 'user',
  `refresh_token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `permissionId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vats`
--

CREATE TABLE `vats` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` float NOT NULL,
  `type` enum('amount','percentage') NOT NULL DEFAULT 'amount',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `warranties`
--

CREATE TABLE `warranties` (
  `id` int(11) NOT NULL,
  `receive_date` varchar(255) DEFAULT '01-01-2024',
  `delivery_date` varchar(255) DEFAULT '12-12-2024',
  `delivery_fee` float NOT NULL DEFAULT 0,
  `warranty_fee` float NOT NULL DEFAULT 0,
  `advance_amount` float NOT NULL DEFAULT 0,
  `due_amount` float NOT NULL DEFAULT 0,
  `description` varchar(255) DEFAULT NULL,
  `status` enum('courier','received','delivery','success') DEFAULT 'received',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `brandId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barcodes`
--
ALTER TABLE `barcodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customerhistories`
--
ALTER TABLE `customerhistories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expensecategories`
--
ALTER TABLE `expensecategories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `paymentmethods`
--
ALTER TABLE `paymentmethods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productcategories`
--
ALTER TABLE `productcategories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplierandproductrelation`
--
ALTER TABLE `supplierandproductrelation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `supplierandproductrelation_SupplierId_ProductId_unique` (`ProductId`,`SupplierId`),
  ADD KEY `SupplierId` (`SupplierId`);

--
-- Indexes for table `supplierhistories`
--
ALTER TABLE `supplierhistories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplierId` (`supplierId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `permissionId` (`permissionId`);

--
-- Indexes for table `vats`
--
ALTER TABLE `vats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `warranties`
--
ALTER TABLE `warranties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `brandId` (`brandId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barcodes`
--
ALTER TABLE `barcodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customerhistories`
--
ALTER TABLE `customerhistories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expensecategories`
--
ALTER TABLE `expensecategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paymentmethods`
--
ALTER TABLE `paymentmethods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productcategories`
--
ALTER TABLE `productcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supplierandproductrelation`
--
ALTER TABLE `supplierandproductrelation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplierhistories`
--
ALTER TABLE `supplierhistories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vats`
--
ALTER TABLE `vats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `warranties`
--
ALTER TABLE `warranties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barcodes`
--
ALTER TABLE `barcodes`
  ADD CONSTRAINT `barcodes_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `customerhistories`
--
ALTER TABLE `customerhistories`
  ADD CONSTRAINT `customerhistories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `productcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `supplierandproductrelation`
--
ALTER TABLE `supplierandproductrelation`
  ADD CONSTRAINT `supplierandproductrelation_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `supplierandproductrelation_ibfk_2` FOREIGN KEY (`SupplierId`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `supplierhistories`
--
ALTER TABLE `supplierhistories`
  ADD CONSTRAINT `supplierhistories_ibfk_1` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `supplierhistories_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `supplierhistories_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `warranties`
--
ALTER TABLE `warranties`
  ADD CONSTRAINT `warranties_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `warranties_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `productcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `warranties_ibfk_3` FOREIGN KEY (`customerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `warranties_ibfk_4` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
