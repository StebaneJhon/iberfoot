CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) NOT NULL
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INT,
    team TEXT,
    image TEXT
);

CREATE TABLE coaches (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INT,
    team TEXT,
    image TEXT
);