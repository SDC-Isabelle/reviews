-- Database: sdc

--DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc2
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
  CREATE TABLE IF NOT EXISTS public.reviews
  (
      review_id serial NOT NULL,
      product_id integer NOT NULL,
      rating integer NOT NULL,
      date double precision NOT NULL,
      summary text COLLATE pg_catalog."default",
      body text COLLATE pg_catalog."default",
      recommend boolean NOT NULL,
      reported boolean NOT NULL,
      reviewer_name text COLLATE pg_catalog."default",
      reviewer_email text COLLATE pg_catalog."default",
      response text COLLATE pg_catalog."default",
      helpfulness integer,
      CONSTRAINT reviews_pkey PRIMARY KEY (review_id)
  )

  TABLESPACE pg_default;

  ALTER TABLE IF EXISTS public.reviews
      OWNER to ludong;
  -- Index: reviews_product_id_index

  -- DROP INDEX IF EXISTS public.reviews_product_id_index;

  CREATE INDEX IF NOT EXISTS reviews_product_id_index
      ON public.reviews USING btree
      (product_id ASC NULLS LAST)
      TABLESPACE pg_default;

----------REVIEWS PHOTOS TABLE----------------------------------------
  DROP TABLE IF EXISTS public.reviews_photos;
  CREATE TABLE IF NOT EXISTS public.reviews_photos
  (
    photo_id serial NOT NULL,
    review_id integer NOT NULL references reviews(review_id),
    url text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT reviews_photos_pkey PRIMARY KEY (photo_id)
  )

  TABLESPACE pg_default;

  ALTER TABLE IF EXISTS public.reviews_photos
      OWNER to ludong;

  --DROP INDEX IF EXISTS public.reviews_photos_review_id_index;

  CREATE INDEX IF NOT EXISTS reviews_photos_review_id_index
        ON public.reviews_photos USING btree
        (review_id ASC NULLS LAST)
  TABLESPACE pg_default;

----------Characteristics TABLE-----------------------------------------

  CREATE TABLE IF NOT EXISTS public.characteristics
  (
    id serial NOT NULL,
    product_id integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT characteristics_pkey PRIMARY KEY (id)
  )

  TABLESPACE pg_default;

  ALTER TABLE IF EXISTS public.characteristics
      OWNER to ludong;
  -- Index: characteristics_productid_index

  --DROP INDEX IF EXISTS public.characteristics_productid_index;

  CREATE INDEX IF NOT EXISTS characteristics_productid_index
      ON public.characteristics USING btree
      (product_id ASC NULLS LAST)

  TABLESPACE pg_default;

----------Characteristics TABLE------------------------------------------

  -- Table: public.characteristic_reviews

-- DROP TABLE IF EXISTS public.characteristic_reviews;

CREATE TABLE IF NOT EXISTS public.characteristic_reviews
(
    id serial NOT NULL,
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


-- copy public.reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
-- FROM '/Users/ludong/hackReactor/projects/sdc/data/reviews.csv' DELIMITER ','
-- CSV HEADER QUOTE '\"' ESCAPE '''';""

copy public.reviews_photos (id, review_id, url)
FROM '/Users/ludong/hackReactor/projects/sdc/data/reviews_photos.csv'
DELIMITER ','
CSV HEADER QUOTE '\"'
ESCAPE '''';""

