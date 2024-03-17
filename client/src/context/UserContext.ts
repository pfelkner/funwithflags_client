import React from "react";

interface UserContextValue {
  user: any; // Replace any with the actual type of user
  setUser: React.Dispatch<React.SetStateAction<any>>; // Replace any with the actual type of user
}

const UserContext = React.createContext<UserContextValue | null>(null);

export default UserContext;
