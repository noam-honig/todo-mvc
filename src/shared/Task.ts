import { Allow, Entity, Fields, Validators } from "remult";

@Entity("tasks", {
    allowApiCrud: Allow.authenticated,
    allowApiDelete:"admin",
    defaultOrderBy:{
        id:"asc"
    }
})
export class Task {
    @Fields.autoIncrement()
    id = 0;
    @Fields.string<Task>({
        validate: task => {
            if (task.title.length < 4)
                throw "too short";
        }
    })
    title = '';
    @Fields.boolean()
    completed = false;
}