# DANG Token

A token project built on the Internet Computer using Motoko and React.

This project was created as part of **Angela Yu's Web3 / Internet Computer course**. It follows the course lessons for creating a token canister, storing token balances with a Motoko `HashMap`, and interacting with the token through a React frontend.

## Features

* Check a Principal's DANG token balance
* Claim 10,000 DANG from the faucet
* Transfer DANG tokens to another Principal
* Store token balances in a Motoko `HashMap`
* Interact with the token canister through a React frontend

## Check Your Balance

### 1. Find out your Principal ID

```bash
dfx identity get-principal
```

### 2. Save it somewhere

For example:

```text
My Principal ID is: YOUR_PRINCIPAL_ID
```

### 3. Format and store it in a command-line variable

```bash
OWNER_PUBLIC_KEY="principal \"$(dfx identity get-principal)\""
```

### 4. Check that step 3 worked

```bash
echo $OWNER_PUBLIC_KEY
```

### 5. Check the owner's balance

```bash
dfx canister call token balanceOf "( $OWNER_PUBLIC_KEY )"
```

## Claim Tokens From the Faucet

The faucet gives the calling Principal **10,000 DANG**.

```bash
dfx canister call token faucet
```

The frontend also provides a **Gimme gimme** button for claiming tokens.

## Transfer DANG Tokens

The React frontend provides a Transfer section where you can enter:

* The amount of DANG to transfer
* The recipient's Principal ID

For example:

```text
Amount: 1000
To Principal: YOUR_RECIPIENT_PRINCIPAL_ID
```

After a successful transfer, the application displays:

```text
Transfer successful! Sent 1000 DANG.
```

The transfer function checks that the calling Principal has enough DANG before moving the tokens to the recipient.

### Test With a Second Identity

A second local identity can be created for testing:

```bash
dfx identity new receiver
```

Switch to it:

```bash
dfx identity use receiver
```

Find its Principal:

```bash
dfx identity get-principal
```

Then use that Principal as the recipient in the React application's Transfer section.

## Check a Recipient's Balance

Once a transfer has been completed, you can check the recipient's balance with:

```bash
dfx canister call token balanceOf '(principal "YOUR_RECIPIENT_PRINCIPAL_ID")'
```

For example, after transferring 1,000 DANG, the recipient should have:

```text
(1_000 : nat)
```

## Charge the Canister

### 1. Check the canister ID

```bash
dfx canister id token
```

### 2. Save the canister ID into a command-line variable

```bash
CANISTER_PUBLIC_KEY="principal \"$(dfx canister id token)\""
```

### 3. Check that it worked

```bash
echo $CANISTER_PUBLIC_KEY
```

The token canister in this project has a total supply of:

```text
100,000,000 DANG
```

Only transfer an amount that is available in the calling Principal's balance.

## Deploy the Project to the Live IC Network

### 1. Create and deploy the canisters

```bash
dfx deploy --network ic
```

### 2. Check the live canister ID

```bash
dfx canister --network ic id token
```

### 3. Save the live canister ID to a command-line variable

```bash
LIVE_CANISTER_KEY="principal \"$(dfx canister --network ic id token)\""
```

### 4. Check that it worked

```bash
echo $LIVE_CANISTER_KEY
```

### 5. Transfer tokens to the live canister

Transfer only an amount that is available in the calling Principal's balance:

```bash
dfx canister --network ic call token transfer "($LIVE_CANISTER_KEY, AMOUNT)"
```

### 6. Get the live canister frontend ID

```bash
dfx canister --network ic id token_assets
```

### 7. Create the frontend URL

Copy the ID from step 6 and add `.raw.ic0.app` to the end.

For example:

```text
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
