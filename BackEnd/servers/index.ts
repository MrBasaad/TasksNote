import express from "express";
import { type Express } from "express";
import 'dotenv/config';
import cors from "cors";
import path from "path";
import userRoutes from "@routes/JWTAuthRoutes/userRoutes";
import singinRoutes from "@routes/JWTAuthRoutes/singinRoutes";
import logoutRoutes from "@routes/JWTAuthRoutes/logoutRoutes";
import protectedRoutes from "@routes/JWTAuthRoutes/protectedRoutes";
import refreshTokenRoutes from "@routes/JWTAuthRoutes/refreshTokenRoutes";
import userIdRoutes from "@routes/JWTAuthRoutes/userIdRoutes";
import createTeacktNumRoutes from "@routes/DataTablesRoutes/createTeacktNumRoutes";
import rowDataTableRoutes from "@routes//DataTablesRoutes/rowDataTableRoutes";
import showAlldataRoutes from "@routes/DataTablesRoutes/showAllDataRoutes";
import getRowDataRoutes from "@routes/DataTablesRoutes/getRowDataRoutes";
import getCountDataRoutes from "@routes/DataTablesRoutes/getCountDataRoutes";
import meRoutes from "@routes/JWTAuthRoutes/meRoutes";
import cookieParser from "cookie-parser";
import {createDBUserTable,createDBTicketTable,createTikectDataTable,createIsTikectDoneTable,createDB} from "@controllers/CreateDataBasesTablesContrllers/dbAllTables";
const __dirname:string = path.resolve();
const app:Express = express();
const PORT:number = process.env.PORT;
const HOST:string = "0.0.0.0";
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:9999","http://localhost:9009","http://localhost:4173"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Accept','Authorization'] ,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes); // Create user done
app.use('/singin', singinRoutes); //done
app.use('/logout', logoutRoutes); // done
// app.use('/protected', protectedRoutes); // dosen't need to use it anymore it's replaced py /me
app.use('/reftoken', refreshTokenRoutes); // this endpoint working automaticly by asking from /me
// app.use('/id/user', userIdRoutes); // dosen't this also not anymore needed cuz with pinan the user data are accessable from all the projects files
app.use('/tecketnum', createTeacktNumRoutes); // done this to create new tikect number and get it
app.use('/tecketrow', rowDataTableRoutes); // >
app.use('/alldata', showAlldataRoutes); // done adding new table 
app.use('/getrowdata', getRowDataRoutes); // done  this to show data after created
app.use('/counttrue', getCountDataRoutes); // done this endpont for done and not taskes for chart
app.use('/me',meRoutes); // done
// app.use(express.static(path.join(__dirname, 'public', 'view')));
// app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, HOST, async () => {
    await createDB()
    await createDBUserTable()
    await createDBTicketTable()
    await createTikectDataTable()
    await createIsTikectDoneTable()
    await console.log(`port working on ${PORT}`)
});