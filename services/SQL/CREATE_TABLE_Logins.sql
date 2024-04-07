CREATE TABLE public."Logins"
(
    username character varying(16) NOT NULL,
    password character varying NOT NULL,
    PRIMARY KEY (username),
    CONSTRAINT uq_logins_username UNIQUE (username)
);

ALTER TABLE IF EXISTS public."Logins"
    OWNER to postgres;