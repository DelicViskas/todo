import { signIn } from "next-auth/react";
import classes from '@/components/auth/auth.module.css'

export default function NotSign() {
  return <>
  <button className={classes.btn} onClick={() => signIn()}>Sign in</button>
</>
}