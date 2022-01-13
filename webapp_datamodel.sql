-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 0.9.4
-- PostgreSQL version: 13.0
-- Project Site: pgmodeler.io
-- Model Author: ---
-- object: roletest | type: ROLE --
-- DROP ROLE IF EXISTS roletest;
CREATE ROLE roletest WITH 
	INHERIT;
-- ddl-end --


-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: exampledb | type: DATABASE --
-- DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb
	ENCODING = 'UTF8';
-- ddl-end --
COMMENT ON DATABASE exampledb IS E'Example Database Model';
-- ddl-end --


SET check_function_bodies = false;
-- ddl-end --

-- object: webapp | type: SCHEMA --
-- DROP SCHEMA IF EXISTS webapp CASCADE;
CREATE SCHEMA webapp;
-- ddl-end --

SET search_path TO pg_catalog,public,webapp;
-- ddl-end --

-- object: testlang | type: LANGUAGE --
-- DROP LANGUAGE IF EXISTS testlang CASCADE;
CREATE  LANGUAGE testlang;
-- ddl-end --

-- object: public.trigger_func | type: FUNCTION --
-- DROP FUNCTION IF EXISTS public.trigger_func() CASCADE;
CREATE FUNCTION public.trigger_func ()
	RETURNS trigger
	LANGUAGE testlang
	IMMUTABLE 
	CALLED ON NULL INPUT
	SECURITY DEFINER
	PARALLEL UNSAFE
	COST 20
	AS $$
SELECT 1+1;
$$;
-- ddl-end --

-- object: webapp.users | type: TABLE --
-- DROP TABLE IF EXISTS webapp.users CASCADE;
CREATE TABLE webapp.users (
	user_id varchar(10) NOT NULL,
	user_name varchar(32),
	"user_isAdmin" bool NOT NULL,
	user_enabled bool NOT NULL,
	"user_contactEmail" varchar(255),
	user_salt varchar(255) NOT NULL,
	user_hash varchar(255) NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT table_pk PRIMARY KEY (user_id)
	 WITH (FILLFACTOR = 10),
	CONSTRAINT table_uq UNIQUE (user_name)
	 WITH (FILLFACTOR = 10),
	CONSTRAINT table_ck CHECK ( column1 > 0 )
);
-- ddl-end --

-- object: index | type: INDEX --
-- DROP INDEX IF EXISTS webapp.index CASCADE;
CREATE UNIQUE INDEX  CONCURRENTLY index ON webapp.users
USING hash
(
	user_name
);
-- ddl-end --

-- object: webapp.compounds | type: TABLE --
-- DROP TABLE IF EXISTS webapp.compounds CASCADE;
CREATE TABLE webapp.compounds (
	comp_id varchar(10) NOT NULL,
	comp_index integer NOT NULL,
	comp_material varchar(255) NOT NULL,
	comp_notation text NOT NULL,
	comp_components jsonb,
	comp_properties jsonb,
	comp_activities jsonb,
	"comp_overallProperties" jsonb,
	"comp_overallActivities" jsonb,
	CONSTRAINT table_pk_1 PRIMARY KEY (comp_id)
	 WITH (FILLFACTOR = 10),
	CONSTRAINT table_uq_1 UNIQUE (comp_index)
	 WITH (FILLFACTOR = 10),
	CONSTRAINT table_ck CHECK ( column1 > 0 )
);
-- ddl-end --

-- object: index_1 | type: INDEX --
-- DROP INDEX IF EXISTS webapp.index_1 CASCADE;
CREATE UNIQUE INDEX  CONCURRENTLY index_1 ON webapp.compounds
USING hash
(
	comp_index
);
-- ddl-end --

-- object: fdw_test | type: FOREIGN DATA WRAPPER --
-- DROP FOREIGN DATA WRAPPER IF EXISTS fdw_test CASCADE;
CREATE FOREIGN DATA WRAPPER fdw_test
NO HANDLER
NO VALIDATOR;
-- ddl-end --
ALTER FOREIGN DATA WRAPPER fdw_test OWNER TO roletest;
-- ddl-end --

-- object: server_test | type: SERVER --
-- DROP SERVER IF EXISTS server_test CASCADE;
CREATE SERVER server_test
FOREIGN DATA WRAPPER fdw_test;
-- ddl-end --
ALTER SERVER server_test OWNER TO roletest;
-- ddl-end --


