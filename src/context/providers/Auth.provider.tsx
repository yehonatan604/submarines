import { ReactNode, useState } from "react";
import { deleteToken, saveToken } from "../../helpers/storage.helper";
import { TUser } from "../../types/TUser";
import AuthContext from "../Auth.context";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);

  const login = async (user: TUser, token: string) => {
    setUser(user);
    await saveToken(token);
  };

  const logout = async () => {
    setUser(null);
    await deleteToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
