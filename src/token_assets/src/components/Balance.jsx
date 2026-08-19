import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {
  const [balance, setBalance] = useState(null);

  async function handleClick() {
    console.log("Balance Button Clicked");

    const principalId = document.getElementById("balance-principal-id").value;

    if (!principalId) {
      return;
    }

    try {
      const principal = Principal.fromText(principalId);
      const result = await token.balanceOf(principal);

      console.log("Balance from canister:", result.toString());

      setBalance(result.toString());
    } catch (error) {
      console.error("Balance error:", error);
    }
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>

      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
        />
      </p>

      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>

      {balance !== null && (
        <p>
          This account has a balance of {balance} DANG.
        </p>
      )}
    </div>
  );
}

export default Balance;