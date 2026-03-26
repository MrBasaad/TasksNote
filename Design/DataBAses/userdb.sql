CREATE DATABASE dailynotes;
CREATE TABLE users(iduser BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,username TEXT NOT NULL unique,passworduser TEXT NOT NULL,emailuser TEXT NOT NULL,reftoken TEXT);
/*
Table users {
  idUser integer [increment, unique, primary key, not null ]
  userName text [not null , unique]
  passwordUser text [not null]
  emailUser text [not null]
}

*/