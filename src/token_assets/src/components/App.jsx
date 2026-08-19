import React, { useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function handleLogin() {
    const authClient = await AuthClient.create();

    await authClient.login({
      identityProvider:
        "http://localhost:8000/?canisterId=sbzkb-zqaaa-aaaaa-aaaiq-cai",
      onSuccess: () => {
        setIsAuthenticated(true);
      },
    });
  }

  return (
    <div id="screen">
      <Header />

      {!isAuthenticated ? (
        <div className="window white">
          <h2>Internet Identity</h2>

          <p>Login to use your DANG tokens.</p>

          <button onClick={handleLogin}>
            Login with Internet Identity
          </button>
        </div>
      ) : (
        <>
          <Faucet />
          <Balance />
          <Transfer />
        </>
      )}
    </div>
  );
}

export default App;
