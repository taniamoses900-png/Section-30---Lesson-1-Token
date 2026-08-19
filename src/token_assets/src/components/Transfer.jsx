import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Transfer() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  async function handleClick(event) {
    event.preventDefault();
    setMessage("");

    if (!amount || !recipient) {
      setMessage("Please enter an amount and recipient Principal.");
      return;
    }

    try {
      const transferAmount = BigInt(amount);

      if (transferAmount <= 0n) {
        setMessage("Amount must be greater than 0.");
        return;
      }

      const recipientPrincipal = Principal.fromText(recipient);

      console.log("Transfer amount:", transferAmount.toString());
      console.log("Recipient:", recipientPrincipal.toText());

      const result = await token.transfer(
        recipientPrincipal,
        transferAmount
      );

      console.log("Transfer result:", result);

      if (result === true) {
        setMessage(
          `Transfer successful! Sent ${transferAmount.toString()} DANG.`
        );
        setAmount("");
        setRecipient("");
      } else {
        setMessage(
          "Transfer failed. The account calling the canister does not have enough DANG."
        );
      }
    } catch (error) {
      console.error("Transfer error:", error);

      setMessage(
        "Transfer failed. Check that the Principal ID is valid."
      );
    }
  }

  return (
    <div className="window white">
      <h2>Transfer</h2>

      <form onSubmit={handleClick}>
        <label>Amount:</label>

        <p>
          <input
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Amount"
          />
        </p>

        <label>To Principal:</label>

        <p>
          <input
            type="text"
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
            placeholder="Enter Principal ID"
          />
        </p>

        <p className="trade-buttons">
          <button type="submit">
            Transfer
          </button>
        </p>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Transfer;