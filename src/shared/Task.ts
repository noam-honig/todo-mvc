import { Entity, Fields } from "remult";

@Entity("tasks", {
    allowApiCrud: true,
    defaultOrderBy: {
        id: "asc"
    }
})
export class Task {
    @Fields.autoIncrement()
    id = 0;
    @Fields.string()
    title = '';
    @Fields.boolean()
    completed = false;
}