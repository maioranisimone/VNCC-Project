-- Creazione di un database relazionale PostgreSQL e di una tabella per la gestione di una lista della spesa.

-- Database.
CREATE DATABASE db;
\c db;

-- Tabella.
CREATE TABLE list_shop (
    id SERIAL NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    amount INT NOT NULL DEFAULT 1,
    price INT NOT NULL DEFAULT 1,
    insertion_time TIMESTAMP DEFAULT TIMEZONE('Europe/Rome', NOW()),
    PRIMARY KEY (id)
);