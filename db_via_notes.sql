/* CRIE E USE O BANCO DE DADOS db_via_notes */
CREATE DATABASE db_via_notes;
USE db_via_notes;

/* CRIE A TABELA QUE VAI ARMAZENAR OS STATUS */
CREATE TABLE tb_status (
  `id_status` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL
);

/* CRIE A TABELA QUE VAI ARMAZENAR AS NOTAS */
CREATE TABLE tb_note (
  `id_note` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `description` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `id_user` VARCHAR(250) NOT NULL,
  `fk_id_status` INT NOT NULL
);

/* STATUS PADRÃO */
INSERT INTO tb_status (`name`) VALUES ('A Fazer'), ('Importante'), ('Finalizado');
