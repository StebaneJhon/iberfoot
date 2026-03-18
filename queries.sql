CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) NOT NULL
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    position TEXT,
    age INT,
    team TEXT
);

CREATE TABLE coaches (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INT,
    team TEXT
);