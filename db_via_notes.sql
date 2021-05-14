/* BANCO DE DADOS db_via_notes */
CREATE DATABASE db_via_notes;
USE db_via_notes;

/* TABELA DE USUÁRIOS */
CREATE TABLE tb_user (
  `id_user` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

/* TABELA DE STATUS */
CREATE TABLE tb_status (
  `id_status` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL
);

/* TABELA DE NOTAS */
CREATE TABLE tb_note (
  `id_note` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `description` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `fk_id_status` INT NOT NULL,
  `fk_id_user` INT NOT NULL
);

/* STATUS PADRÃO */
INSERT INTO tb_status (`name`) VALUES ('A Fazer'), ('Importante'), ('Finalizado');
