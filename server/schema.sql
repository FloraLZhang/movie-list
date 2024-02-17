CREATE DATABASE movielist;

USE movielist;

CREATE TABLE movies (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  watchstatus VARCHAR(50),
  PRIMARY KEY (id)
);
