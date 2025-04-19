import { ReactNode, useState } from "react";
import { TUser } from "../../types/TUser";
import AuthContext from "../auth.context";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);

  const login = async (user: TUser) => {
    setUser(user);
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
