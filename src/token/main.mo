import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

actor Token {

let owner : Principal = Principal.fromText(
"b46nr-koxhp-ns4sr-p4iur-c6nso-rkynw-qpw4g-w54qt-bi5f7-lg2un-yqe"
);

let totalSupply : Nat = 100000000;

let symbol : Text = "DANG";

let balances = HashMap.HashMap<Principal, Nat>(
1,
Principal.equal,
Principal.hash
);


stable var balanceEntries : [(Principal, Nat)] = [];


balances.put(owner, totalSupply);

public query func balanceOf(who : Principal) : async Nat {
switch (balances.get(who)) {
case null 0;
case (?balance) balance;
};
};

public shared(msg) func faucet() : async Nat {
let caller = msg.caller;


let result = await transfer(caller, 10000);

if (result) {
  return 10000;
} else {
  return 0;
};


};

public shared(msg) func transfer(
to : Principal,
amount : Nat
) : async Bool {


let caller = msg.caller;

if (amount == 0) {
  return false;
};

let senderBalance = switch (balances.get(caller)) {
  case null 0;
  case (?balance) balance;
};

if (senderBalance < amount) {
  return false;
};

let receiverBalance = switch (balances.get(to)) {
  case null 0;
  case (?balance) balance;
};

balances.put(caller, senderBalance - amount);
balances.put(to, receiverBalance + amount);

return true;


};

system func preupgrade() {
balanceEntries := Iter.toArray(balances.entries());
};

system func postupgrade() {
for ((principal, balance) in balanceEntries.vals()) {
balances.put(principal, balance);
};


balanceEntries := [];


};
}
