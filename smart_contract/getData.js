var Web3 = require('web3');
var TruffleContract = require("truffle-contract");
var ABI = require("./build/contracts/Credophy.json");
// module.exports.init = function () {
// var updateData = function(data){
	var Credophy = TruffleContract(ABI);
	var jdata = JSON.parse('{"id": "00000001"}');
	console.log(jdata["id"]);
	// var keys = Object.keys(ABI["networks"]);
	// var cert_address = ABI["networks"][keys[keys.length-1]]["address"];

	var provider = new Web3.providers.HttpProvider("http://localhost:8545");
	Credophy.setProvider(provider);

	var deployed;
	Credophy.deployed().then(function(instance) {
		deployed = instance;
		return deployed.getCert(jdata["id"]);
	}).then(function(result) {
		return result;
	}).catch(function(err) {
		console.log(err);
	  	return err;
	});
// };