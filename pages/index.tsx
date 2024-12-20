import Auth from "@/components/auth";
import ToDoList from "@/components/ToDoList";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>ToDo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Auth />
      <ToDoList />
    </>
  );
}
