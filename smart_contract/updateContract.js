var Web3 = require('web3');
var TruffleContract = require("truffle-contract");
var ABI = require("./build/contracts/Credophy.json");
// module.exports.init = function () {
// var updateData = function(data){
	var Credophy = TruffleContract(ABI);
	var jdata = JSON.parse('{"recipient": "0x3a8f101123c575a31287c5e6f1c568c7947ee0d4", "title": "idontcare", "_status": "idontcare", "uint": 1234, "_end_date": 1234}');
	// console.log(jdata["id"]);
	// var keys = Object.keys(ABI["networks"]);
	// var cert_address = ABI["networks"][keys[keys.length-1]]["address"];

	var provider = new Web3.providers.HttpProvider("http://localhost:8545");
	Credophy.setProvider(provider);

	var deployed;
	Credophy.deployed().then(function(instance) {
		deployed = instance;
		return deployed.issueCert('0x3a8f101123c575a31287c5e6f1c568c7947ee0d4', jdata['title'], jdata['_status'], jdata['uint'], jdata['_end_date']);
	}).then(function(result) {
		return result;
	}).catch(function(err) {
		console.log(err);
	  	return err;
	});
// };