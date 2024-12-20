import { useSession, signOut } from "next-auth/react";
import classes from '@/components/auth/auth.module.css'

export default function Sign() {
  const { data: session } = useSession();

  return <div className={classes.sign}>
    <span className={classes.signInfo}>Signed in as <b>{session?.user?.email}</b></span>
    <button className={classes.btn} onClick={() => signOut()}>Sign out</button>
  </div>
}