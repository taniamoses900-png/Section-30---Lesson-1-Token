import React from "react";
import { token } from "../../../declarations/token";

function Faucet() {
  async function handleClick(event) {
    event.preventDefault();

    try {
      const result = await token.faucet();

      alert("You received " + result.toString() + " DANG!");
    } catch (error) {
      console.error("Faucet error:", error);
      alert("Faucet failed.");
    }
  }

  return (
    <div className="window white">
      <h2>🚰 Faucet</h2>

      <p>
        Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.
      </p>

      <form onSubmit={handleClick}>
        <p className="trade-buttons">
          <button type="submit">
            Gimme gimme
          </button>
        </p>
      </form>
    </div>
  );
}

export default Faucet;