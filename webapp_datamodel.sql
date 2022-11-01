--ddl-begin--
-- Create our database, and add it to the search path
CREATE DATABASE webapp ENCODING = 'UTF8';
CREATE SCHEMA webapp;
SET search_path TO pg_catalog,public,webapp;
-- Enable rdkit extension and allow webapp to use it
CREATE EXTENSION rdkit;
-- ddl-end --
