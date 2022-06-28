import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";
import { createPostgresConnection } from "remult/postgres";

export const api = remultExpress({
    dataProvider: createPostgresConnection({
        connectionString: "postgres://postgres:MASTERKEY@localhost/postgres"
    }),
    entities: [Task],
    initApi: async remult => {
        if (await remult.repo(Task).count() === 0) {
            await remult.repo(Task).insert([
                { id: 1, title: "Setup", completed: true },
                { id: 2, title: "Entities", completed: false },
                { id: 3, title: "Paging, Sorting and Filtering", completed: false },
                { id: 4, title: "CRUD Operations", completed: false },
                { id: 5, title: "Validation", completed: false },
                { id: 6, title: "Backend methods", completed: false },
                { id: 7, title: "Database", completed: false },
                { id: 8, title: "Authentication and Authorization", completed: false },
                { id: 9, title: "Deployment", completed: false }
            ]);
        }
    }
})