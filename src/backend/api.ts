import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";
import { createPostgresConnection } from "remult/postgres";

export const api = remultExpress({
    dataProvider: createPostgresConnection({
        connectionString: "postgres://postgres:MASTERKEY@localhost/postgres"
    }),
    entities: [Task]
})