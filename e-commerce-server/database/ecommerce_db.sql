-- MySQL Script generated by MySQL Workbench
-- Wed Sep 21 12:18:52 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ecommerce_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ecommerce_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecommerce_db` DEFAULT CHARACTER SET utf8 ;
USE `ecommerce_db` ;

-- -----------------------------------------------------
-- Table `ecommerce_db`.`user_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`user_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type_id` INT NOT NULL,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(30) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `profile_picture` VARCHAR(255) NULL,
  `is_banned` TINYINT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_user_types1_idx` (`type_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_user_types1`
    FOREIGN KEY (`type_id`)
    REFERENCES `ecommerce_db`.`user_types` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_db`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `seller_id` INT NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_categories_users1_idx` (`seller_id` ASC) VISIBLE,
  CONSTRAINT `fk_categories_users1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `ecommerce_db`.`users` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categorie_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `price` FLOAT NOT NULL,
  `quantity` FLOAT NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `views` BIGINT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`, `categorie_id`),
  INDEX `fk_products_categories1_idx` (`categorie_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`categorie_id`)
    REFERENCES `ecommerce_db`.`categories` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_db`.`discounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`discounts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `seller_id` INT NOT NULL,
  `code` VARCHAR(20) NOT NULL,
  `percentage` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_discounts_users1_idx` (`seller_id` ASC) VISIBLE,
  CONSTRAINT `fk_discounts_users1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `ecommerce_db`.`users` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_db`.`ads`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`ads` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `seller_id` INT NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `cost` FLOAT NOT NULL,
  `end_date` DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ads_users1_idx` (`seller_id` ASC) VISIBLE,
  CONSTRAINT `fk_ads_users1`
    FOREIGN KEY (`seller_id`)
    REFERENCES `ecommerce_db`.`users` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_db`.`favorite_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`favorite_products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_favorite_products_products1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_favorite_products_users1_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `fk_favorite_products_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `ecommerce_db`.`products` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT,
  CONSTRAINT `fk_favorite_products_users1`
    FOREIGN KEY (`client_id`)
    REFERENCES `ecommerce_db`.`users` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_db`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `discount_id` INT NOT NULL,
  `total` FLOAT NOT NULL DEFAULT 0,
  `status` TINYINT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL,
  `purchased_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_carts_discounts1_idx` (`discount_id` ASC) VISIBLE,
  INDEX `fk_carts_users1_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `fk_carts_discounts1`
    FOREIGN KEY (`discount_id`)
    REFERENCES `ecommerce_db`.`discounts` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT,
  CONSTRAINT `fk_carts_users1`
    FOREIGN KEY (`client_id`)
    REFERENCES `ecommerce_db`.`users` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_db`.`wishlists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`wishlists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `total` FLOAT NOT NULL DEFAULT 0,
  `status` TINYINT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL,
  `purchased_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_wishlists_users1_idx` (`client_id` ASC) VISIBLE,
  CONSTRAINT `fk_wishlists_users1`
    FOREIGN KEY (`client_id`)
    REFERENCES `ecommerce_db`.`users` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_db`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `message` LONGTEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_messages_users1_idx` (`sender_id` ASC) VISIBLE,
  INDEX `fk_messages_users2_idx` (`receiver_id` ASC) VISIBLE,
  CONSTRAINT `fk_messages_users1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `ecommerce_db`.`users` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT,
  CONSTRAINT `fk_messages_users2`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `ecommerce_db`.`users` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_db`.`cart_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`cart_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cart_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` FLOAT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cart_items_carts1_idx` (`cart_id` ASC) VISIBLE,
  INDEX `fk_cart_items_products1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_cart_items_carts1`
    FOREIGN KEY (`cart_id`)
    REFERENCES `ecommerce_db`.`carts` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT,
  CONSTRAINT `fk_cart_items_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `ecommerce_db`.`products` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_db`.`wishlist_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_db`.`wishlist_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `wishlist_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` FLOAT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_wishlist_items_wishlists1_idx` (`wishlist_id` ASC) VISIBLE,
  INDEX `fk_wishlist_items_products1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_wishlist_items_wishlists1`
    FOREIGN KEY (`wishlist_id`)
    REFERENCES `ecommerce_db`.`wishlists` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT,
  CONSTRAINT `fk_wishlist_items_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `ecommerce_db`.`products` (`id`)
    ON DELETE RISTRICT
    ON UPDATE RISTRICT)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
