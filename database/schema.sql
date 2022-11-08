-- Database: sdc

-- DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc
    WITH
    OWNER = ludong
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

\c sdc2;
----------REVIEWS TABLE------------------------------------------

 -- DROP TABLE IF EXISTS public.reviews;
  -- Table: public.reviews

-- DROP TABLE IF EXISTS public.reviews;

CREATE TABLE IF NOT EXISTS public.reviews
(
    review_id integer NOT NULL DEFAULT nextval('reviews_review_id_seq'::regclass),
    product_id integer NOT NULL,
    rating integer NOT NULL,
    date double precision NOT NULL,
    summary text COLLATE pg_catalog."default",
    body text COLLATE pg_catalog."default",
    recommend boolean NOT NULL,
    reported boolean NOT NULL DEFAULT false,
    reviewer_name text COLLATE pg_catalog."default" NOT NULL,
    reviewer_email text COLLATE pg_catalog."default",
    response text COLLATE pg_catalog."default",
    helpfulness integer DEFAULT 0,
    CONSTRAINT reviews_pkey PRIMARY KEY (review_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reviews
    OWNER to postgres;
-- Index: reviews_product_id_index

-- DROP INDEX IF EXISTS public.reviews_product_id_index;

CREATE INDEX IF NOT EXISTS reviews_product_id_index
    ON public.reviews USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;

----------REVIEWS PHOTOS TABLE----------------------------------------
  -- Table: public.reviews_photos

-- DROP TABLE IF EXISTS public.reviews_photos;

CREATE TABLE IF NOT EXISTS public.reviews_photos
(
    photo_id  integer NOT NULL DEFAULT nextval('reviews_photos_photo_id_seq'::regclass),
    review_id integer NOT NULL,
    url text COLLATE pg_catalog."default",
    CONSTRAINT reviews_photos_pkey PRIMARY KEY (photo_id),
    CONSTRAINT reviews_photos_to_reviews FOREIGN KEY (review_id)
        REFERENCES public.reviews (review_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reviews_photos
    OWNER to postgres;
-- Index: reviews_photos_review_id_index

-- DROP INDEX IF EXISTS public.reviews_photos_review_id_index;

CREATE INDEX IF NOT EXISTS reviews_photos_review_id_index
    ON public.reviews_photos USING btree
    (review_id ASC NULLS LAST)
    TABLESPACE pg_default;

----------Characteristics TABLE-----------------------------------------

  -- Table: public.characteristics

-- DROP TABLE IF EXISTS public.characteristics;

CREATE TABLE IF NOT EXISTS public.characteristics
(
    id integer NOT NULL DEFAULT nextval('characteristics_id_seq'::regclass),
    product_id integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT characteristics_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.characteristics
    OWNER to postgres;
-- Index: characteristics_productid_index

-- DROP INDEX IF EXISTS public.characteristics_productid_index;

CREATE INDEX IF NOT EXISTS characteristics_productid_index
    ON public.characteristics USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;

----------Characteristics TABLE------------------------------------------

-- Table: public.characteristic_reviews

-- DROP TABLE IF EXISTS public.characteristic_reviews;

CREATE TABLE IF NOT EXISTS public.characteristic_reviews
(
    id integer NOT NULL DEFAULT nextval('characteristic_reviews_id_seq'::regclass),
    characteristic_id integer NOT NULL,
    review_id integer NOT NULL,
    value integer NOT NULL,
    CONSTRAINT characteristic_reviews_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.characteristic_reviews
    OWNER to postgres;
-- Index: characteristic_reviews_characteristic_id_index

-- DROP INDEX IF EXISTS public.characteristic_reviews_characteristic_id_index;

CREATE INDEX IF NOT EXISTS characteristic_reviews_characteristic_id_index
    ON public.characteristic_reviews USING btree
    (characteristic_id ASC NULLS LAST)
    TABLESPACE pg_default;




