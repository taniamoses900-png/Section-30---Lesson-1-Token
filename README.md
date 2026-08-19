# DANG Token

A token project built on the Internet Computer using Motoko and React.

This project was created as part of **Angela Yu's Web3 / Internet Computer course**. It follows the course lessons for creating a token canister, storing token balances with a Motoko `HashMap`, implementing token transfers, using the faucet, and persisting balances through canister upgrades.

## Features

* Check a Principal's DANG token balance
* Claim 10,000 DANG from the faucet
* Transfer DANG tokens to another Principal
* Store token balances in a Motoko `HashMap`
* Persist token balances through canister upgrades
* Use `preupgrade()` to save HashMap data
* Use `postupgrade()` to restore HashMap data
* Use the `transfer()` function to distribute faucet tokens
* Interact with the token canister through a React frontend

## Check Your Balance

### 1. Find out your Principal ID

```
dfx identity get-principal
```

### 2. Format and store it in a command-line variable

```
OWNER_PUBLIC_KEY="principal \"$(dfx identity get-principal)\""
```

### 3. Check that it worked

```
echo $OWNER_PUBLIC_KEY
```

### 4. Check the owner's balance

```
dfx canister call token balanceOf "( $OWNER_PUBLIC_KEY )"
```

## Claim Tokens From the Faucet

The faucet gives the calling Principal **10,000 DANG**.

The faucet uses the token's `transfer()` functionality to send the tokens from the token canister's balance to the Principal calling the faucet.

### Using the command line

```
dfx canister call token faucet
```

### Using the React frontend

The frontend provides a **Gimme gimme** button for claiming tokens.

After a successful claim, the application displays:

```
You received 10000 DANG!
```

## Fund the Token Canister

Because the faucet uses `transfer()`, the token canister must have DANG available before it can distribute tokens.

### 1. Check the token canister ID

```
dfx canister id token
```

### 2. Save the canister ID into a command-line variable

```
CANISTER_PUBLIC_KEY="principal \"$(dfx canister id token)\""
```

### 3. Check that it worked

```
echo $CANISTER_PUBLIC_KEY
```

### 4. Transfer DANG to the token canister

The initial token supply is **100,000,000 DANG**.

For example, 50,000,000 DANG can be transferred to the token canister:

```
dfx canister call token transfer "($CANISTER_PUBLIC_KEY, 50000000)"
```

### 5. Check the token canister's balance

```
dfx canister call token balanceOf "($CANISTER_PUBLIC_KEY)"
```

The canister should then have:

```
(50000000 : nat)
```

The canister uses this balance to distribute DANG through the faucet.

## Persisting Balances Through Canister Upgrades

Lesson 355 demonstrates how to persist data stored in a non-stable Motoko `HashMap`.

A `HashMap` is not directly stable, so the project uses a stable variable called `balanceEntries` to temporarily store the balances during a canister upgrade.

### Preupgrade

Before the canister is upgraded, `preupgrade()` converts the HashMap entries into an array and stores them in stable memory:

```
system func preupgrade() {
  balanceEntries := Iter.toArray(balances.entries());
};
```

### Postupgrade

After the canister upgrade, `postupgrade()` loops through the saved entries and restores them to the HashMap:

```
system func postupgrade() {
  for ((principal, balance) in balanceEntries.vals()) {
    balances.put(principal, balance);
  };

  balanceEntries := [];
};
```

This allows the token balances to survive a canister upgrade.

### Testing Persistence

The project was tested by:

1. Checking the owner's balance before the upgrade.
2. Deploying the updated canister.
3. Checking the owner's balance after the upgrade.
4. Confirming that the balance was preserved.
5. Testing the faucet after the upgrade.
6. Confirming that the transferred tokens were reflected in the owner's balance.
7. Testing a transfer to a second Principal.

The owner's balance remained available after the canister upgrade, confirming that `preupgrade()` and `postupgrade()` successfully persisted the HashMap data.

## Transfer DANG Tokens

The React frontend provides a Transfer section where you can enter:

* The amount of DANG to transfer
* The recipient's Principal ID

For example:

```
Amount: 1000
To Principal: YOUR_RECIPIENT_PRINCIPAL_ID
```

After a successful transfer, the application displays:

```
Transfer successful! Sent 1000 DANG.
```

The `transfer()` function checks that:

* The transfer amount is greater than zero.
* The calling Principal has enough DANG.
* The sender's balance is reduced by the transfer amount.
* The recipient's balance is increased by the transfer amount.

## Test With a Second Identity

A second local identity can be created for testing:

```
dfx identity new receiver
```

Switch to it:

```
dfx identity use receiver
```

Find its Principal:

```
dfx identity get-principal
```

Then use that Principal as the recipient in the React application's Transfer section.

## Check a Recipient's Balance

Once a transfer has been completed, you can check the recipient's balance with:

```
dfx canister call token balanceOf '(principal "YOUR_RECIPIENT_PRINCIPAL_ID")'
```

For example, after transferring 1,000 DANG, the recipient should have:

```
(1000 : nat)
```

## Deploy the Project Locally

Start the local Internet Computer replica:

```
dfx start --background
```

Deploy the canisters:

```
dfx deploy
```

Get the token canister ID:

```
dfx canister id token
```

Start the React frontend:

```
npm start
```

The application is available at:

```
http://localhost:8080
```

## Deploy the Project to the Live IC Network

### 1. Create and deploy the canisters

```
dfx deploy --network ic
```

### 2. Check the live canister ID

```
dfx canister --network ic id token
```

### 3. Save the live canister ID to a command-line variable

```
LIVE_CANISTER_KEY="principal \"$(dfx canister --network ic id token)\""
```

### 4. Check that it worked

```
echo $LIVE_CANISTER_KEY
```

### 5. Transfer tokens to the live canister

Transfer only an amount that is available in the calling Principal's balance:

```
dfx canister --network ic call token transfer "($LIVE_CANISTER_KEY, AMOUNT)"
```

### 6. Get the live canister frontend ID

```
dfx canister --network ic id token_assets
```

### 7. Create the frontend URL

Copy the ID from step 6 and add `.raw.ic0.app` to the end.

For example:

```
zdv65-7qaaa-aaaai-qibdq-cai.raw.ic0.app
```

## Technologies Used

* Motoko
* React
* JavaScript
* Webpack
* Internet Computer
* DFINITY SDK

## Credit

This project was created while following **Angela Yu's Web3 / Internet Computer course**.

Special thanks to **Angela Yu** for the course instruction and project walkthroughs that guided the development of this token project.

This repository is my own learning project based on the course material and is intended for educational purposes.
