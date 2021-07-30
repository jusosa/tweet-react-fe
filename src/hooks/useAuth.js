import { useContext } from "react";
import { AuthContext } from "../utils/context";

const GlobalContext = () => useContext(AuthContext);

export default GlobalContext;
