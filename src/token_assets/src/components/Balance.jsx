import React, { useState } from "react";

function Balance() {
  const [balance, setBalance] = useState(null);

  async function handleClick() {
    console.log("Balance Button Clicked");

    const principalId = document.getElementById("balance-principal-id").value;

    if (!principalId) {
      return;
    }

    setBalance(100000000);
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
          This account has a balance of {balance} R.
        </p>
      )}
    </div>
  );
}

export default Balance;