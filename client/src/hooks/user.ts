import { useContext } from "react";
import UserContext from "../context/UserContext";

export const useUserId = (): string => {
  const userContext = useContext(UserContext);
  const storedUser = sessionStorage.getItem("user") || "";
  const user = JSON.parse(storedUser) || userContext?.user;

  if (!user) throw new Error("Missing User");

  return user.id;
};
