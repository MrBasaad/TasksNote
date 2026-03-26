CREATE TABLE istikectdone(id BIGSERIAL PRIMARY KEY,iduserfr INTEGER NOT NULL,ticketnumber INTEGER NOT NULL,isdone BOOL NOT NULL DEFAULT FALSE,CONSTRAINT uniq_ticket_done UNIQUE (iduserfr, ticketnumber), CONSTRAINT fk_ticket_done FOREIGN KEY (iduserfr, ticketnumber) REFERENCES tacketid(iduserfr, ticketnumber));

CREATE OR REPLACE FUNCTION update_istikectdone_status() RETURNS TRIGGER AS $$ BEGIN INSERT INTO istikectdone (iduserfr, ticketnumber, isdone) VALUES (NEW.iduserfr,NEW.ticketnumber,(SELECT bool_and(doneornot) FROM tacketdata WHERE iduserfr = NEW.iduserfr AND ticketnumber = NEW.ticketnumber)) ON CONFLICT (iduserfr, ticketnumber) DO UPDATE SET isdone = EXCLUDED.isdone; RETURN NEW; END; $$ LANGUAGE plpgsql;
-- triger runer
CREATE TRIGGER trg_update_istikectdone AFTER INSERT OR UPDATE OF doneornot ON tacketdata FOR EACH ROW EXECUTE FUNCTION update_istikectdone_status();
