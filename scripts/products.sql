ALTER USER 'root' @'localhost' IDENTIFIED WITH mysql_native_password BY 'root123' create schema `nestjs`;

create table `nestjs`.`product` (
    `id` INT NOT NULL,
    `title` VARCHAR(80) null,
    `description` TEXT(4000) null,
    `product_col` VARCHAR(45) NULL,
    primary key (`id`)
);