import { signIn } from "next-auth/react";

export default function GoogleLogin() {
  return (
    <button onClick={() => signIn('google')}>
      Login with Google
    </button>
  );
}