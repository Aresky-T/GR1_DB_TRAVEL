/*
 CREATE DATABASE "gr1_db_travel"
 */

DROP DATABASE IF EXISTS `gr1_db_travel`;

CREATE DATABASE IF NOT EXISTS `gr1_db_travel`;

USE `gr1_db_travel`;

/*
 CREATE TABLE `Role`
 */

-- DROP TABLE IF EXISTS `Role`;

-- CREATE TABLE IF NOT EXISTS `Role`(

--     id          INT NOT NULL AUTO_INCREMENT,

--     `role_name` ENUM('USER', 'ADMIN') NOT NULL UNIQUE,

--     PRIMARY KEY(id)

-- );

-- INSERT DATA TO `Role` table

-- INSERT INTO `Role` (`role_name`) VALUES ('USER'), ('ADMIN');

/*
 CREATE TABLE `Account`
 */

DROP TABLE IF EXISTS `Account`;

CREATE TABLE
    IF NOT EXISTS `Account`(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `username` VARCHAR(30) NOT NULL UNIQUE,
        `password` VARCHAR(255) NOT NULL,
        `email` VARCHAR(100) NOT NULL UNIQUE,
        `status` ENUM('ACTIVE', 'BLOCKED') NOT NULL DEFAULT 'ACTIVE',
        `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
        `created_time` DATETIME NOT NULL DEFAULT NOW(),
        `updated_time` DATETIME NOT NULL DEFAULT NOW()
    );

/*
 CREATE TABLE `Profile`
 */

DROP TABLE IF EXISTS `Profile`;

CREATE TABLE
    IF NOT EXISTS `Profile` (
        id INT NOT NULL AUTO_INCREMENT,
        `avatar_url` VARCHAR(255) NULL,
        `full_name` VARCHAR(100) NULL,
        `address` VARCHAR(255) NULL,
        `phone` VARCHAR(20) NULL,
        `date_of_birth` DATE NULL,
        `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
        `account_id` INT NOT NULL UNIQUE,
        PRIMARY KEY(id),
        FOREIGN KEY (`account_id`) REFERENCES `Account`(id) ON DELETE CASCADE
    );

/*
 CREATE TABLE `Tourist_attraction` (Dia diem tham quan noi tieng)
 */

DROP TABLE IF EXISTS `Tourist_attraction`;

CREATE TABLE
    IF NOT EXISTS `Tourist_attraction` (
        id INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NOT NULL UNIQUE,
        `image_url` TEXT NOT NULL,
        `title` VARCHAR(255) NOT NULL,
        `intro` TEXT NOT NULL,
        `created_time` DATETIME NOT NULL DEFAULT NOW(),
        PRIMARY KEY(id)
    );

/*
 CREATE TABLE `TourAtt_blog_content` (Bai viet ve dia diem tham quan)
 */

DROP TABLE IF EXISTS `TourAtt_blog_content`;

CREATE TABLE
    IF NOT EXISTS `TourAtt_blog_content` (
        id INT NOT NULL AUTO_INCREMENT,
        `sub_title` VARCHAR(255) NOT NULL,
        `content` TEXT NOT NULL,
        `image` TEXT NULL,
        `tourAtt_id` INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (`tourAtt_id`) REFERENCES `Tourist_attraction`(id) ON DELETE CASCADE
    );

/*
 CREATE TABLE `Tour_guide` (Huong dan vien du lich)
 */

DROP TABLE IF EXISTS `Tour_guide`;

CREATE TABLE
    IF NOT EXISTS `Tour_guide` (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `full_name` VARCHAR(100) NOT NULL,
        `avatar_url` VARCHAR(255) NOT NULL,
        `birthDate` DATE NOT NULL,
        `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
        `description` VARCHAR(255) NOT NULL,
        `phone` VARCHAR(20) NOT NULL,
        `address` VARCHAR(200) NOT NULL,
        `status` ENUM('BUSY','AVAILABLE') NOT NULL
    );

/*
 CREATE TABLE `Tour`
 */

DROP TABLE IF EXISTS `Tour`;

CREATE TABLE
    IF NOT EXISTS `Tour` (
        id INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(255) NOT NULL UNIQUE,
        `image1` VARCHAR(255) NOT NULL,
        `image2` VARCHAR(255) NOT NULL,
        `image3` VARCHAR(255) NOT NULL,
        `image4` VARCHAR(255) NOT NULL,
        `start_time` VARCHAR(100) NOT NULL,
        `time` VARCHAR(100) NOT NULL,
        `start_address` VARCHAR(255) NOT NULL,
        `destination_list` VARCHAR(255) NOT NULL,
        `available_seats` INT NOT NULL,
        `total_seats` INT NOT NULL,
        `vehicle` VARCHAR(50) NOT NULL,
        `schedule_description` TEXT NOT NULL,
        `price1` INT NOT NULL,
        `price2` INT NOT NULL,
        `price3` INT NOT NULL,
        `tour_guide` INT NULL,
        `tour_code` VARCHAR(100) NOT NULL UNIQUE,
        `created_time` DATETIME NOT NULL DEFAULT NOW(),
        PRIMARY KEY(id),
        FOREIGN KEY (`tour_guide`) REFERENCES `Tour_guide`(id) ON DELETE
        SET NULL
    );

/*
 CREATE TABLE `Booked_tour_information` (Thong tin tour da dat)
 */

DROP TABLE IF EXISTS `Booked_tour_information`;

CREATE TABLE
    IF NOT EXISTS `Booked_tour_information`(
        id  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `full_name` VARCHAR(100) NOT NULL,
        `email` VARCHAR(100) NOT NULL,
        `phone` VARCHAR(20) NOT NULL,
        `address` VARCHAR(255) NOT NULL,
        `total_persons` INT NOT NULL,
        `adult_number` INT NOT NULL,
        `children_number` INT NOT NULL,
        `baby_number` INT NOT NULL,
        `note` VARCHAR(255) NULL,
        `total_price` INT NOT NULL,
        `book_time` DATETIME NOT NULL DEFAULT now(),
        `status` ENUM(
            'WAITING',
            'NOT_STARTED',
            'ON_GOING',
            'FINISHED',
            'CANCELLED'
        ),
        `account_id` INT NOT NULL,
        `tour_id` INT NOT NULL,
        UNIQUE KEY uk_account_tour (`account_id`, `tour_id`),
        Foreign Key (`account_id`) REFERENCES `Account`(id) ON DELETE CASCADE,
        Foreign Key (`tour_id`) REFERENCES `Tour`(id) ON DELETE CASCADE
    );

/*
 CREATE TABLE `Request_cancel_booked_tour` (Yeu cau huy tour da dat)
 */

DROP TABLE IF EXISTS `Request_cancel_booked_tour` ;

CREATE TABLE
    IF NOT EXISTS `Request_cancel_booked_tour`(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        reason VARCHAR(255) NOT NULL,
        request_time DATETIME NOT NULL DEFAULT now(),
        booked_tour_id INT NOT NULL,
        FOREIGN KEY (`booked_tour_id`) REFERENCES `Booked_tour_information`(id) ON DELETE CASCADE
    );

/*
 CREATE TABLE `Tourist_list` (Danh sach khach du lich)
 */

DROP TABLE IF EXISTS `Tourist_list`;

CREATE TABLE
    IF NOT EXISTS `Tourist_list` (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        full_name VARCHAR(100) NOT NULL,
        birth_date DATE NOT NULL,
        gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
        booked_tour_id INT NOT NULL,
        FOREIGN KEY (booked_tour_id) REFERENCES `Booked_tour_information`(id) ON DELETE CASCADE
    );