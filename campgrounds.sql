CREATE TABLE public.campgrounds (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
    park_name varchar(255) NOT NULL,
	facility_id int4 NOT NULL,
	days int4 NOT NULL,
	start_date varchar(255) NOT NULL,
	CONSTRAINT campgrounds_pkey PRIMARY KEY (id)
);

ALTER TABLE public.campgrounds ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id);