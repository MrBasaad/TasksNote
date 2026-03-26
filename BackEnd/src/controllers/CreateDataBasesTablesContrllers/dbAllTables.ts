import pool from "@models/db";
import type { QueryResult } from "pg";
export const createDB = async ()=>{
    try{
        const dbName:string = "dailynotes";
        const isDBExists:QueryResult = await pool.query(`SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = '${dbName}');`);
        if(!isDBExists.rows[0].exists){
            await console.log("this DataBasd not exists wait until I create it .");
            await console.log("                                                 ..");
            await console.log("                                                 ...");
            await console.log(".....................................................");
            const createDB:QueryResult = await pool.query(`CREATE DATABASE ${dbName};`)
            await console.log(createDB.command === 'CREATE'?'successfully':'not successfully');
            return await createDB;}
            return await console.log(`this DataBaase ${dbName} is exists`);            
    }catch (error){
    return error;
    }
}
export const createDBUserTable = async ()=>{
 try {
    const tableName: string = "users";
    const isUSerTableDBCreated:QueryResult = await pool.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '${tableName}');`);
        if(!isUSerTableDBCreated.rows[0].exists){
            await console.log("this tables is not exists wait until I create it .");
            await console.log("                                                 ..");
            await console.log("                                                 ...");
            await console.log(".....................................................");
            const createtableusers:QueryResult = await pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(iduser BIGSERIAL UNIQUE NOT NULL PRIMARY KEY, username TEXT NOT NULL unique,passworduser TEXT NOT NULL,emailuser TEXT NOT NULL,reftoken TEXT);`)
            await console.log(createtableusers.command === 'CREATE'?'successfully':'not successfully');
            return await createtableusers;
        }
            return await console.log(`this tables ${tableName} is exists`);
 } catch (error) {
    return error;  
 }
}
export const createDBTicketTable = async ()=>{
 try {
    const tableName: string = "tacketid";
    const isUSerTableDBCreated:QueryResult = await pool.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '${tableName}');`);
        if(!isUSerTableDBCreated.rows[0].exists){
            await console.log(`this tables is ${tableName} not exists wait until I create it .`);
            await console.log("                                                 ..");
            await console.log("                                                 ...");
            await console.log(".....................................................");
            const createtableusers:QueryResult = await pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(iduserfr INTEGER NOT NULL ,ticketnumber INTEGER NOT NULL,PRIMARY KEY(iduserfr,ticketnumber), FOREIGN KEY (iduserfr) REFERENCES users(iduser));`);
            await console.log(createtableusers.command === 'CREATE'?'successfully':'not successfully');
            const trigerFunction:QueryResult = await pool.query(`CREATE OR REPLACE FUNCTION set_ticket_number() RETURNS TRIGGER AS $$ BEGIN SELECT COALESCE(MAX(ticketnumber),0)+1 INTO NEW.ticketnumber FROM tacketid WHERE iduserfr=NEW.iduserfr; RETURN NEW; END; $$ LANGUAGE plpgsql;`);
            const triger:QueryResult = await pool.query(`CREATE TRIGGER trg_set_ticket_number BEFORE INSERT ON tacketid FOR EACH ROW EXECUTE FUNCTION set_ticket_number();`);
            await console.log("trigger created successfully");
            return await createtableusers;
        }
            return await console.log(`this tables ${tableName} is exists`);
 } catch (error) {
    return error;  
 }
}
export const createTikectDataTable = async ()=>{
 try {
    const tableName:string = "tacketdata";
    const isUSerTableDBCreated:QueryResult = await pool.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '${tableName}');`);
        if(!isUSerTableDBCreated.rows[0].exists){
            await console.log(`this tables ${tableName} is not exists wait until I create it .`);
            await console.log("                                                 ..");
            await console.log("                                                 ...");
            await console.log(".....................................................");
            const createtableusers:QueryResult = await pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,iduserfr INTEGER NOT NULL ,ticketnumber INTEGER NOT NULL , rownum INTEGER NOT NULL ,rowdate DATE NOT NULL ,rowtexttacket TEXT NOT NULL ,timefortecket TEXT NOT NULL ,doneornot BOOL NOT NULL ,FOREIGN KEY (iduserfr, ticketnumber) REFERENCES tacketid(iduserfr, ticketnumber));`)
            await console.log(createtableusers.command === 'CREATE'?'successfully':'not successfully');
            return await createtableusers;
        }
            return await console.log(`this tables ${tableName} is exists`);
 } catch (error) {
    return error;  
 }
}
export const createIsTikectDoneTable = async ()=>{
 try {
    const tableName:string = "istikectdone";
    const isUSerTableDBCreated:QueryResult = await pool.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '${tableName}');`);
        if(!isUSerTableDBCreated.rows[0].exists){
            await console.log(`this tables is ${tableName} not exists wait until I create it .`);
            await console.log("                                                 ..");
            await console.log("                                                 ...");
            await console.log(".....................................................");
            const createtableusers:QueryResult = await pool.query(`CREATE TABLE IF NOT EXISTS ${tableName}(id BIGSERIAL PRIMARY KEY,iduserfr INTEGER NOT NULL,ticketnumber INTEGER NOT NULL,isdone BOOL NOT NULL DEFAULT FALSE,CONSTRAINT uniq_ticket_done UNIQUE (iduserfr, ticketnumber), CONSTRAINT fk_ticket_done FOREIGN KEY (iduserfr, ticketnumber) REFERENCES tacketid(iduserfr, ticketnumber));`);
            await console.log(createtableusers.command === 'CREATE'?'successfully':'not successfully');
            const trigerFunction:QueryResult = await pool.query(`CREATE OR REPLACE FUNCTION update_istikectdone_status() RETURNS TRIGGER AS $$ BEGIN INSERT INTO istikectdone (iduserfr, ticketnumber, isdone) VALUES (NEW.iduserfr,NEW.ticketnumber,(SELECT bool_and(doneornot) FROM tacketdata WHERE iduserfr = NEW.iduserfr AND ticketnumber = NEW.ticketnumber)) ON CONFLICT (iduserfr, ticketnumber) DO UPDATE SET isdone = EXCLUDED.isdone; RETURN NEW; END; $$ LANGUAGE plpgsql;`);
            const triger:QueryResult = await pool.query(`CREATE TRIGGER trg_update_istikectdone AFTER INSERT OR UPDATE OF doneornot ON tacketdata FOR EACH ROW EXECUTE FUNCTION update_istikectdone_status();`);
            await console.log("trigger created successfully");
            return await createtableusers;
        }
            return await console.log(`this tables ${tableName} is exists`);
 } catch (error) {
    return error;  
 }
}
