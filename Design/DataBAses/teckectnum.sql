CREATE TABLE tacketID(iduserfr INTEGER NOT NULL ,ticketNumber INTEGER NOT NULL,PRIMARY KEY(iduserfr,ticketNumber), FOREIGN KEY (iduserfr) REFERENCES users(idUser));

CREATE OR REPLACE FUNCTION set_ticket_number() RETURNS TRIGGER AS $$ BEGIN SELECT COALESCE(MAX(ticketNumber),0)+1 INTO NEW.ticketNumber FROM tacketID WHERE iduserfr=NEW.iduserfr; RETURN NEW; END; $$ LANGUAGE plpgsql;
CREATE TRIGGER trg_set_ticket_number BEFORE INSERT ON tacketID FOR EACH ROW EXECUTE FUNCTION set_ticket_number();

/*
Table tacketID{
  iduserfr integer [ref: - users.idUser, not null]
  idTecket integer [unique,not null, increment, primary key]
  ticketNumber integer [not null]

}
*/