# DANG Token

A token project built on the Internet Computer using Motoko and React.

This project was created as part of **Angela Yu's Web3 / Internet Computer course**. It follows the course lessons for creating a token canister, storing token balances with a Motoko HashMap, and interacting with the token through a React frontend.

## Check your Balance

### 1. Find out your Principal ID

```bash
dfx identity get-principal
```

### 2. Save it somewhere

For example:

```text
My Principal ID is: b46nr-koxhp-ns4sr-p4iur-c6nso-rkynw-qpw4g-w54qt-bi5f7-lg2un-yqe
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

## Charge the Canister

### 1. Check the canister ID

```bash
dfx canister id token
```

### 2. Save the canister ID into a command-line variable

```bash
CANISTER_PUBLIC_KEY="principal \"$(dfx canister id token)\""
```

### 3. Check that the canister ID has been successfully saved

```bash
echo $CANISTER_PUBLIC_KEY
```

### 4. Transfer half a billion tokens to the canister Principal ID

```bash
dfx canister call token transfer "($CANISTER_PUBLIC_KEY, 500_000_000)"
```

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

### 5. Transfer some tokens to the live canister

```bash
dfx canister --network ic call token transfer "($LIVE_CANISTER_KEY, 50_000_000)"
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
