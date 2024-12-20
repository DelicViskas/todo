import { useSession } from "next-auth/react";
import classes from '@/components/auth/auth.module.css'
import Sign from "./sign";
import NotSign from "./notsign";

export default function Auth() {
  const { data: session } = useSession();
  
  return (
    <div className={classes.sign}>
      {session ? <Sign/> : <NotSign />}
    </div>
  )
}