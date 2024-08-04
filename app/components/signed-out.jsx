import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const SignedOut = ({ children }) => {
  const [user] = useAuthState(auth);
  console.log(user);

  if (user) return null;

  return <>{children}</>;
};