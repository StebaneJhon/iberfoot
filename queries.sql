CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) NOT NULL
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INT,
    position TEXT,
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

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
	telephone VARCHAR(20),
    title VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT email_or_phone_required 
    CHECK (email IS NOT NULL OR telephone IS NOT NULL)
);

CREATE TABLE players_dynamic_photos (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);