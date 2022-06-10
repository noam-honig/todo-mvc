import './App.css';
import { useState } from "react";
import { Task } from "./shared/Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'a', title: "Task a", completed: false },
    { id: 'b', title: "Task b", completed: false },
    { id: 'c', title: "Task c", completed: true },
    { id: 'd', title: "Task d", completed: false },
    { id: 'e', title: "Task e", completed: true }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState<Task>();
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  const createNewTask = async () => {
    if (newTaskTitle) {
      setTasks([...tasks, { title: newTaskTitle, completed: false, id: tasks.length.toString() }]);
      setNewTaskTitle('');
    }
  }

  const setAll = async (completed: boolean) => {
    setTasks(tasks.map(task => ({ ...task, completed })));
  }

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            onBlur={createNewTask}
            onKeyDown={e => { if (e.key === 'Enter') createNewTask() }} />
        </header>

        <section className="main">
          <input id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={tasks.length > 0 && tasks[0].completed}
            onChange={e => setAll(e.target.checked)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {tasks.filter(task => !hideCompleted || !task.completed)
              .map(task => {

                const titleChange = (title: string) => {
                  setEditingTask({ ...editingTask!, title });

                };
                const saveTask = async () => {
                  setTasks(tasks.map(t => t === task ? editingTask! : t));
                  setEditingTask(undefined);
                };

                const setCompleted = async (completed: boolean) => {
                  setTasks(tasks.map(t => t === task ? { ...task, completed } : t));
                }


                const deleteTask = async () => {
                  setTasks(tasks.filter(t => t !== task));
                };

                return <li key={task.id} className={task.id === editingTask?.id ? 'editing' : task.completed ? 'completed' : ''}>
                  <div className="view">
                    <input className="toggle" type="checkbox"
                      checked={task.completed}
                      onChange={e => setCompleted(e.target.checked)}
                    />
                    <label  onClick={() => setEditingTask(task)}>{task.title}</label>
                    <button className="destroy" onClick={deleteTask}></button>
                  </div>
                  <input className="edit"
                    value={editingTask?.title || ''}
                    onBlur={saveTask}
                    onChange={e => titleChange(e.target.value)} />
                </li>
              })}
          </ul>
        </section>
        <footer className="footer">
          <button onClick={() => setHideCompleted(false)} >All </button>
          <button onClick={() => setHideCompleted(true)}>Active</button>
        </footer>
      </section>


      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://www.github.com/remult/remult">remult</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </>
  );
}
export default App;