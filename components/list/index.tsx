import classes from '@/components/list/list.module.css'
import { Todo } from "@/components/ToDoList"

export default function List({ data, delTodo }: {data: Todo[], delTodo: (id:number) => void}) {
  let num = 0;
  return <div className={classes.list}>
    {data.map(({ id, text }) => {
      
      return <div data-id={id} className={classes.todo} key={num++}>
        <div>{text}</div>
        <button className={classes.delete} onClick={() => delTodo(id)}>❌</button>
      </div>
    })}
  </div>
}