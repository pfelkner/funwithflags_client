import { useContext } from "react";
import UserContext from "../context/UserContext";

export const useUserId = (): string => {
  const userContext = useContext(UserContext);
  const storedUser = JSON.parse(sessionStorage.getItem("user") || "");

  if (!userContext && !storedUser) throw new Error("Missing User");

  return userContext?.user?.id || storedUser.id;
};
