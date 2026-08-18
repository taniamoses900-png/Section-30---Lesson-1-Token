import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

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

  balances.put(owner, totalSupply);

  public query func balanceOf(who : Principal) : async Nat {
    let balance = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };

    return balance;
  };
}