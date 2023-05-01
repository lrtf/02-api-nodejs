import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { createConnection } from "../datasource";

async function create() {
    const id = uuidV4();
    const password = await hash("admin", 8);
    const conn = await createConnection("localhost");
    conn.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
         VALUES('${id}', 'admin', 'admin@rentex.com.br', '${password}', true, now(), 'XXXXXX')
        `
    );

    await conn.destroy();
}

create().then(() => console.log("User Admin created"));
