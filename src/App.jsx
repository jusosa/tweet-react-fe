import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import SignInSingUp from "./page/SignInSingUp";
import { AuthContext } from "./utils/context";
import { isUserLogged } from "./api/auth";
import Routing from "./routers/Routing";

function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLogged());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin]);

  if (!loadUser) {
    return null;
  }

  return (
    <AuthContext.Provider value={user}>
      <h1>
        {user ? (
          <Routing setRefreshCheckLogin={setRefreshCheckLogin} />
        ) : (
          <div>
            <SignInSingUp setRefreshCheckLogin={setRefreshCheckLogin} />
          </div>
        )}
      </h1>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}

export default App;
