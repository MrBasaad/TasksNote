import PG from "pg";
const { Pool } = PG;
// إنشاء نقطة اتصال لقاعدة البيانات
const pool = new Pool({
    user: process.env.DBuser,
    password: process.env.DBpassword,
    host: process.env.DBhost,
    port: process.env.DBport,
    database: process.env.DBname,
});
export default pool;