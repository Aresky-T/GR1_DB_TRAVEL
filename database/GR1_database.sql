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
        id          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `username`  VARCHAR(30) NOT NULL UNIQUE,
        `password`  VARCHAR(255) NOT NULL,
        `email`     VARCHAR(100) NOT NULL UNIQUE,
        `status`    ENUM('ACTIVE', 'BLOCKED') NOT NULL DEFAULT 'ACTIVE',
        `role`      ENUM('USER', 'ADMIN')   NOT NULL DEFAULT 'USER',
        `created_time` DATETIME NOT NULL DEFAULT NOW(),
        `updated_time` DATETIME NOT NULL DEFAULT NOW()
    );

/*
 CREATE TABLE `Profile`
 */
DROP TABLE IF EXISTS `Profile`;
CREATE TABLE
    IF NOT EXISTS `Profile` (
        id              INT NOT NULL AUTO_INCREMENT,
        `avatar_url`    VARCHAR(255) NULL,
        `full_name`     VARCHAR(100) NULL,
        `address`       VARCHAR(255) NULL,
        `phone`         VARCHAR(20)  NULL,
        `date_of_birth` DATE    NULL,
        `gender`        ENUM('MALE', 'FEMALE')  NULL,
        `account_id`    INT NOT NULL UNIQUE,
        PRIMARY KEY(id),
        FOREIGN KEY (`account_id`) REFERENCES `Account`(id) ON DELETE CASCADE
    );

/*
 CREATE TABLE `Tourist_attraction`
 */
DROP TABLE IF EXISTS `Tourist_attraction`;
CREATE TABLE
    IF NOT EXISTS `Tourist_attraction` (
        id              INT NOT NULL AUTO_INCREMENT,
        `name`          VARCHAR(255) NOT NULL UNIQUE,
        `image_url`     TEXT NOT NULL,
        `title`         VARCHAR(255) NOT NULL,
        `intro`         TEXT NOT NULL,
        `created_time`  DATETIME NOT NULL DEFAULT NOW(),
        PRIMARY KEY(id)
    );

/*
 CREATE TABLE `TourAtt_blog_content`
 */
DROP TABLE IF EXISTS `TourAtt_blog_content`;
CREATE TABLE 
    IF NOT EXISTS `TourAtt_blog_content` (
        id              INT NOT NULL AUTO_INCREMENT,
        `sub_title`     VARCHAR(255) NOT NULL,
        `content`       TEXT    NOT NULL,
        `image`         TEXT    NULL,
        `tourAtt_id`    INT  NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (`tourAtt_id`) REFERENCES `Tourist_attraction`(id) ON DELETE CASCADE
);

/*
 CREATE TABLE `Tour`
 */
DROP TABLE IF EXISTS `Tour`;
CREATE TABLE
    IF NOT EXISTS `Tour` (
        id                  INT NOT NULL AUTO_INCREMENT,
        `title`             VARCHAR(255) NOT NULL UNIQUE,
        `image1`            TEXT NOT NULL,
        `image2`            TEXT NOT NULL,
        `image3`            TEXT NOT NULL,
        `image4`            TEXT NOT NULL,
        `start_time`        DATETIME NOT NULL,
        `time`              VARCHAR(100) NOT NULL,
        `start_address`     VARCHAR(255) NOT NULL,
        `destination_list`  VARCHAR(255) NOT NULL,
        `available_seats`   INT NOT NULL,
        `total_seats`       INT NOT NULL,
        `vehicle`           VARCHAR(50) NOT NULL,
        `schedule_description` TEXT NOT NULL,
        `price1`            INT NOT NULL,
        `price2`            INT NOT NULL,
        `price3`            INT NOT NULL,
        `tour_guide`        INT NULL,
        `tour_code`         VARCHAR(100) NOT NULL UNIQUE,
        PRIMARY KEY(id)
    );

/*
 CREATE TABLE `Tour_guide`
 */
DROP TABLE IF EXISTS `Tour_guide`;
CREATE TABLE
    IF NOT EXISTS `Tour_guide` (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        `full_name`     VARCHAR(100) NOT NULL,
        `avatar_url`    VARCHAR(255) NOT NULL,
        `age`           INT NOT NULL,
        `description`    INT NOT NULL,
        `phone`         VARCHAR(20) NOT NULL,
        `address`       VARCHAR(200) NOT NULL
    );

/*
 CREATE TABLE `Book_tour_information`
 */
DROP TABLE IF EXISTS `Book_tour_information`;
CREATE TABLE
    IF NOT EXISTS `Book_tour_information`(
        `account_id`        INT NOT NULL,
        `tour_id`           INT NOT NULL,
        `full_name`         VARCHAR(100) NOT NULL,
        `email`             VARCHAR(100) NOT NULL,
        `phone`             VARCHAR(20) NOT NULL,
        `address`           VARCHAR(255) NOT NULL,
        `total_persons`     INT NOT NULL,
        `adult_number`      INT NOT NULL,
        `children_number`   INT NOT NULL,
        `baby_number`       INT NOT NULL,
        `note`              VARCHAR(255) NULL,
        `total_price`       INT NOT NULL,
        `book_time`     DATETIME NOT NULL DEFAULT now(),
        PRIMARY KEY (`account_id`, `tour_id`),
        Foreign Key (`account_id`)  REFERENCES `account`(id) ON DELETE CASCADE,
        Foreign Key (`tour_id`)     REFERENCES `tour`(id) ON DELETE CASCADE
    )