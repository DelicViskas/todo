import useSWR from "swr";
import FormToDo from "@/components/form";
import List from "@/components/list";
import { fetcher } from "./f"
import Spinner from "@/components/spinner";



export type Todo = {
  id: number;
  text: string | React.JSX.Element;
}


const API_URL = '/api/todos';

export default function ToDoList() {
  const
    { data, mutate } = useSWR<Todo[]>(API_URL, fetcher, { revalidateOnFocus: false }),
    delTodo = async (id: number) => {
      const 
        optimisticData = data?.map(todo => todo.id === id? {...todo, text: <Spinner />} : todo),
        promise =  fetcher(API_URL + '/' + id, { method: 'DELETE' });
      await mutate(promise.then(() => optimisticData, () => fetcher(API_URL)), { optimisticData, revalidate: true });
    },
    addTodo = async (valueInput: string) => {
      if (!valueInput.trim()) {
        console.error("Input is empty, not sending request");
        return;
      }
      const
        newTodo = { text: <Spinner/> },
        optimisticData = data ? [...data, newTodo as Todo] : [newTodo as Todo],
        promise =  fetcher(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({text: valueInput})
        });
      await mutate(promise.then(() => optimisticData, () => fetcher(API_URL)), { optimisticData, revalidate: true });
    }

return <>
  <FormToDo addTodo={addTodo} />
  {data && <List data={data} delTodo={delTodo} />}
</>
}