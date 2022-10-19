
CREATE DATABASE ankasa-flight;

CREATE TABLE users (
    id              VARCHAR NOT NULL PRIMARY KEY, 
    name            VARCHAR NULL, 
    email           VARCHAR NULL, 
    password        TEXT NULL, 
    photo           TEXT NULL,
    phone           VARCHAR NULL, 
    city            VARCHAR NULL, 
    address         TEXT NULL, 
    postal_code     VARCHAR NULL, 
    level           INT NULL, 
    is_verified     VARCHAR NULL, 
    created_date    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    token           TEXT NULL
);

CREATE TABLE products (
    id              VARCHAR NOT NULL PRIMARY KEY,
    origin          VARCHAR NULL,
    destination     VARCHAR NULL,
    type            VARCHAR NULL,
    stock           VARCHAR NULL,
    transit_total   VARCHAR NULL,
    flight_date     DATE NULL,
    airline_id      VARCHAR NULL,
    estimation      VARCHAR NULL,
    create_date     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    code            VARCHAR NULL,
    gate            VARCHAR NULL,
    terminal        VARCHAR NULL,
    price           VARCHAR NULL
);

CREATE TABLE credit_card (
    id              VARCHAR NOT NULL PRIMARY KEY,
    number          VARCHAR NULL, 
    name            VARCHAR NULL,
    user_id         VARCHAR NULL
);

CREATE TABLE destinations (
    id              VARCHAR NOT NULL PRIMARY KEY, 
    country         VARCHAR NULL, 
    place           VARCHAR NULL, 
    image           TEXT NULL, 
    price           VARCHAR NULL, 
    total_airline   VARCHAR NULL, 
    date            DATE
);

CREATE TABLE transactions (
    id              VARCHAR NOT NULL PRIMARY KEY, 
    is_paid         VARCHAR NULL, 
    user_id         VARCHAR NULL, 
    seat            VARCHAR NULL, 
    total_order     VARCHAR NULL, 
    passenger_name  VARCHAR NULL, 
    passenger_phone VARCHAR NULL,
    product_id      VARCHAR NULL, 
    airline_id      VARCHAR NULL
);

CREATE TABLE airlines (
    id               VARCHAR NOT NULL PRIMARY KEY,
    photo            TEXT NULL, 
    name             VARCHAR NULL, 
    pic              VARCHAR NULL, 
    phone            VARCHAR NULL,      
    created_date     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  
    is_active        VARCHAR NULL
);

-- Delete Isi Column
TRUNCATE TABLE users RESTART IDENTITY CASCADE;