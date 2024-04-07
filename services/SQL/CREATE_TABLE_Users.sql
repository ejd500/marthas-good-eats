CREATE TABLE public."Users"
(
    user_id serial NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    is_staff boolean NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT "Users_email_unique" UNIQUE (email)
);

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;