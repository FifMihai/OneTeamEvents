// lib/db.ts
import { Pool } from 'pg';

let conn: any;

if (!conn) {
  conn = new Pool({
    // 👇 Aici pui link-ul direct între ghilimele (păstrează ghilimelele!)
    connectionString: 'postgresql://neondb_owner:npg_3NlWqaXD5pix@ep-empty-tree-ag2t7hph-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    });
    
}

export default conn;