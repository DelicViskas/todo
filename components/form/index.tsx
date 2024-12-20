import classes from '@/components/form/form.module.css'
import { useState } from 'react'

export default function FormToDo({ addTodo }: {addTodo: (valueInput:string) => void}) {
  const [valueInput, setValueInput] = useState<string>('');
  return <>
    <input className={classes.todoInput} type="text" value={valueInput} onChange={event => setValueInput(event.target.value)} />
    <button className={classes.btn} onClick={() =>  { 
      addTodo(valueInput);
      setValueInput('')
    }}>Добавить</button>
  </>
}