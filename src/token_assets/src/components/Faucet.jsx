import React from "react";
import { token } from "../../../declarations/token";

function Faucet() {

  async function handleClick() {
    console.log("Faucet Button Clicked");

    try {
      const result = await token.faucet();

      console.log("Faucet result:", result.toString());

      if (result === 0n) {
        alert("Already claimed!");
      } else {
        alert("You received 10,000 DANG!");
      }

    } catch (error) {
      console.error("Faucet error:", error);
      alert("Faucet failed. Check the console.");
    }
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>

      <label>
        Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.
      </label>

      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick}>
          Gimme gimme
        </button>
      </p>
    </div>
  );
}

export default Faucet;