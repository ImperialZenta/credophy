// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import ABI from '../../build/contracts/Credophy.json'

// Credophy is our usable abstraction, which we'll use through the code below.
var Credophy = contract(ABI);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the Credophy abstraction for Use.
    Credophy.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      // self.refreshBalance();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");

    status.innerHTML = message;
  },

  addCredential: function() {
    var title = document.getElementById("inputTitle").value;
    var name = document.getElementById("inputName").value;
    var start_date = document.getElementById("inputStart").value;
    var end_date = document.getElementById("inputEnd").value;
    var self = this;

    // var amount = parseInt(document.getElementById("amount").value);
    // var receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");
    console.log("working");

    var meta;
    Credophy.deployed().then(function(instance) {
      meta = instance;
      // return meta.issueCert.call(name, title, 123, parseInt(start_date), parseInt(end_date), {from: web3.eth.accounts[0]});
      return meta.getCert.call(0);

    }).then(function(res) {
      console.log(res);
      self.setStatus("Transaction complete: " + res);
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending certificate; see log.");
    });
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 Credophy, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
