DROP DATABASE IF EXISTS bk_travel_database;

CREATE DATABASE bk_travel_database;

USE bk_travel_database;

DROP TABLE IF EXISTS `Account`;

CREATE TABLE `Account` (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(30) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(100) NOT NULL,
    `status` enum('ACTIVE', 'BLOCKED') NOT NULL DEFAULT 'ACTIVE',
    `role` enum('USER', 'ADMIN', 'EMPLOYEE') NOT NULL DEFAULT 'USER',
    `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Table structure for table `profile`
--
DROP TABLE IF EXISTS `Profile`;

CREATE TABLE `Profile` (
    `id` int NOT NULL AUTO_INCREMENT,
    `avatar_url` varchar(255) DEFAULT NULL,
    `full_name` varchar(100) DEFAULT NULL,
    `address` varchar(255) DEFAULT NULL,
    `phone` varchar(20) DEFAULT NULL,
    `date_of_birth` date DEFAULT NULL,
    `gender` enum('MALE', 'FEMALE', 'OTHER') DEFAULT NULL,
    `account_id` int NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `account_id` (`account_id`),
    CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Table structure for table `tour_guide`
--
DROP TABLE IF EXISTS `Tour_guide`;

CREATE TABLE `Tour_guide` (
    `id` int NOT NULL AUTO_INCREMENT,
    `full_name` varchar(100) NOT NULL,
    `avatar_url` varchar(255) NOT NULL,
    `birth_date` date NOT NULL,
    `gender` enum('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `description` varchar(255) NOT NULL,
    `phone` varchar(20) NOT NULL,
    `address` varchar(200) NOT NULL,
    `status` enum('BUSY', 'AVAILABLE') NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

--
-- Table structure for table `tour`
--
DROP TABLE IF EXISTS `Tour`;

CREATE TABLE `Tour` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `image1` varchar(255) NOT NULL,
    `image2` varchar(255) NOT NULL,
    `image3` varchar(255) NOT NULL,
    `image4` varchar(255) NOT NULL,
    `start_time` varchar(100) NOT NULL,
    `time` varchar(100) NOT NULL,
    `start_address` varchar(255) NOT NULL,
    `destination_list` varchar(255) NOT NULL,
    `available_seats` int NOT NULL,
    `total_seats` int NOT NULL,
    `vehicle` varchar(50) NOT NULL,
    `schedule_description` text NOT NULL,
    `price1` int NOT NULL,
    `price2` int NOT NULL,
    `price3` int NOT NULL,
    `tour_guide` int DEFAULT NULL,
    `tour_code` varchar(100) NOT NULL,
    `status` enum(
        'NOT_STARTED',
        'ON_GOING',
        'FINISHED',
        'CANCELED'
    ) NOT NULL DEFAULT 'NOT_STARTED',
    `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `title` (`title`),
    UNIQUE KEY `tour_code` (`tour_code`),
    KEY `tour_guide` (`tour_guide`),
    CONSTRAINT `tour_ibfk_1` FOREIGN KEY (`tour_guide`) REFERENCES `tour_guide` (`id`) ON DELETE
    SET
        NULL
);

--
-- Table structure for table `booked_tour_information`
--
DROP TABLE IF EXISTS `Booked_tour_information`;

CREATE TABLE `Booked_tour_information` (
    `id` int NOT NULL AUTO_INCREMENT,
    `full_name` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `phone` varchar(20) NOT NULL,
    `address` varchar(255) NOT NULL,
    `total_persons` int NOT NULL,
    `adult_number` int NOT NULL,
    `children_number` int NOT NULL,
    `baby_number` int NOT NULL,
    `note` varchar(255) DEFAULT NULL,
    `total_price` int NOT NULL,
    `book_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `status` enum(
        'NOT_PAY',
        'PAY_UP',
        'REJECTED'
    ) NOT NULL DEFAULT 'NOT_PAY',
    `form_of_payment` ENUM('BANK_TRANSFER', 'CASH_PAYMENT', 'VNPAY_ON_WEBSITE'),
    `account_id` int NOT NULL,
    `tour_id` int NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_account_tour` (`account_id`, `tour_id`),
    KEY `tour_id` (`tour_id`),
    CONSTRAINT `booked_tour_information_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
    CONSTRAINT `booked_tour_information_ibfk_2` FOREIGN KEY (`tour_id`) REFERENCES `tour` (`id`) ON DELETE CASCADE
);

--
-- Table structure for table `tourist_list`
--
DROP TABLE IF EXISTS `Tourist_list`;

CREATE TABLE `Tourist_list` (
    `id` int NOT NULL AUTO_INCREMENT,
    `full_name` varchar(100) NOT NULL,
    `birth_date` date NOT NULL,
    `gender` enum('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `booked_tour_id` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `booked_tour_id` (`booked_tour_id`),
    CONSTRAINT `tourist_list_ibfk_1` FOREIGN KEY (`booked_tour_id`) REFERENCES `booked_tour_information` (`id`) ON DELETE CASCADE
);

--
-- Table structure for table `request_cancel_booked_tour`
--
DROP TABLE IF EXISTS `Request_cancel_booked_tour`;

CREATE TABLE `Request_cancel_booked_tour` (
    `id` int NOT NULL AUTO_INCREMENT,
    `reason` varchar(255) NOT NULL,
    `request_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `booked_tour_id` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `booked_tour_id` (`booked_tour_id`),
    CONSTRAINT `request_cancel_booked_tour_ibfk_1` FOREIGN KEY (`booked_tour_id`) REFERENCES `booked_tour_information` (`id`) ON DELETE CASCADE
);

--
-- Table structure for table `review`
--
DROP TABLE IF EXISTS `Review`;

CREATE TABLE `Review` (
    `id` int NOT NULL AUTO_INCREMENT,
    `stars` int NOT NULL,
    `comment` varchar(255) NOT NULL,
    `review_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `tour_id` int NOT NULL,
    `account_id` int NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `review_unique_key` (`tour_id`, `account_id`),
    KEY `review_fk_1` (`account_id`),
    CONSTRAINT `review_fk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
    CONSTRAINT `review_fk_2` FOREIGN KEY (`tour_id`) REFERENCES `tour` (`id`) ON DELETE CASCADE,
    CONSTRAINT `review_chk_1` CHECK (
        (
            `stars` between 1 and 5
        )
    )
);

--
-- Table structure for table `tourist_attraction`
--
DROP TABLE IF EXISTS `tourist_attraction`;

CREATE TABLE `tourist_attraction` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `image_url` text NOT NULL,
    `title` varchar(255) NOT NULL,
    `intro` text NOT NULL,
    `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
);

--
-- Table structure for table `touratt_blog_content`
--
DROP TABLE IF EXISTS `touratt_blog_content`;

CREATE TABLE `touratt_blog_content` (
    `id` int NOT NULL AUTO_INCREMENT,
    `sub_title` varchar(255) NOT NULL,
    `content` text NOT NULL,
    `image` text,
    `tourAtt_id` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `tourAtt_id` (`tourAtt_id`),
    CONSTRAINT `touratt_blog_content_ibfk_1` FOREIGN KEY (`tourAtt_id`) REFERENCES `tourist_attraction` (`id`) ON DELETE CASCADE
);

--
-- Table structure for table `customer`
--
DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
    `id` int NOT NULL AUTO_INCREMENT,
    `status` enum('ONLINE', 'OFFLINE') NOT NULL,
    `full_name` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `account_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `account_id` (`account_id`),
    CONSTRAINT `cus_fk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE SET NULL
);

--
-- Table structure for table `employee`
--
DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
    `id` int NOT NULL AUTO_INCREMENT,
    `status` enum('ONLINE', 'OFFLINE') NOT NULL,
    `account_id` int NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `account_id` (`account_id`),
    CONSTRAINT `emp_fk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE
);

--
-- Table structure for table `chat_box`
--
DROP TABLE IF EXISTS `chat_box`;

CREATE TABLE `chat_box` (
    `id` int NOT NULL AUTO_INCREMENT,
    `customer_id` int NOT NULL,
    `employee_id` int NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `customer_id` (`customer_id`),
    KEY `employee_id` (`employee_id`),
    CONSTRAINT `chat_box_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
    CONSTRAINT `chat_box_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE
);

--
-- Table structure for table `mail_box`
--
DROP TABLE IF EXISTS `mail_box`;

CREATE TABLE `mail_box` (
    `id` int NOT NULL AUTO_INCREMENT,
    `customer_id` int NOT NULL,
    `employee_id` int NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `customer_id` (`customer_id`),
    KEY `employee_id` (`employee_id`),
    CONSTRAINT `mail_box_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE,
    CONSTRAINT `mail_box_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE
);

--
-- Table structure for table `chat`
--
DROP TABLE IF EXISTS `chat`;

CREATE TABLE `chat` (
    `id` int NOT NULL AUTO_INCREMENT,
    `message` text NOT NULL,
    `chat_box` int NOT NULL,
    `sender` enum('CUSTOMER', 'EMPLOYEE') NOT NULL,
    `status` enum('NEW', 'SEEN') NOT NULL DEFAULT 'NEW',
    `sent_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `chat_fk_1` (`chat_box`),
    CONSTRAINT `chat_fk_1` FOREIGN KEY (`chat_box`) REFERENCES `chat_box` (`id`) ON DELETE CASCADE
);

--
-- Table structure for table `mail`
--
DROP TABLE IF EXISTS `mail`;

CREATE TABLE `mail` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `content` text NOT NULL,
    `mail_box` int NOT NULL,
    `sender` enum('CUSTOMER', 'EMPLOYEE') NOT NULL,
    `sent_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `mail_fk_1` (`mail_box`),
    CONSTRAINT `mail_fk_1` FOREIGN KEY (`mail_box`) REFERENCES `mail_box` (`id`) ON DELETE CASCADE
);

--
-- Table structure for table `mail_reply`
--
DROP TABLE IF EXISTS `mail_reply`;

CREATE TABLE `mail_reply` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `content` text NOT NULL,
    `original_mail` int NOT NULL,
    `replied_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `mail_reply_fk1` (`original_mail`),
    CONSTRAINT `mail_reply_fk1` FOREIGN KEY (`original_mail`) REFERENCES `mail` (`id`) ON DELETE CASCADE
);

--
-- Table structure for table `vnpay_payment_info`
--
DROP TABLE IF EXISTS `vnpay_payment_info`;

CREATE TABLE `vnpay_payment_info` (
    `id` int NOT NULL AUTO_INCREMENT,
    `order_info` varchar(255) DEFAULT NULL,
    `transaction_no` varchar(255) DEFAULT NULL,
    `txn_ref` varchar(255) DEFAULT NULL,
    `amount` varchar(255) DEFAULT NULL,
    `booked_tour_id` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `booked_tour_id` (`booked_tour_id`),
    CONSTRAINT `booked_tour_id` FOREIGN KEY (`booked_tour_id`) REFERENCES `booked_tour_information` (`id`) ON DELETE CASCADE
);