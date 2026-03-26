CREATE TABLE tacketData(id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,iduserfr INTEGER NOT NULL ,ticketNumber INTEGER NOT NULL , rowNum INTEGER NOT NULL ,rowDate DATE NOT NULL ,rowTextTacket TEXT NOT NULL ,timeForTecket TEXT NOT NULL ,doneOrNot BOOL NOT NULL ,allMessionDate DATE NOT NULL,FOREIGN KEY (iduserfr, ticketNumber) REFERENCES tacketID(iduserfr, ticketNumber));

 /*ALTER TABLE tacketdata ADD COLUMN id SERIAL PRIMARY KEY;*/

/*
Table tacketData{
  iduserfr integer [not null,ref: - tacketID.iduserfr]
  idTecketrfr integer [ref: - tacketID.idTecket, not null]
  ticketNumber integer [not null,ref: - tacketID.ticketNumber]
  rowNum integer [not null]
  rowDate date [not null]
  rowTextTacket text [not null]
  timeForTecket text [not null]
  doneOrNot bool [not null]
  allMessionDate date [not null]
}
*/
/*select * from tacketData where iduserfr=$1 and ticketnumber=$2;*/