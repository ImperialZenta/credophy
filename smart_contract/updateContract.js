var Web3 = require('web3');
var TruffleContract = require("truffle-contract");
var ABI = require("./build/contracts/Credophy.json");
// module.exports.init = function () {
// var updateData = function(data){
	var Credophy = TruffleContract(ABI);
	var jdata = JSON.parse('{"recipient": "0x9b8bb3fd6b7551ae1777f15d6836f12c38c20b03", "title": "idontcare", "_status": "idontcare", "uint": 1234, "_end_date": 1234}');
	// console.log(jdata["id"]);
	// var keys = Object.keys(ABI["networks"]);
	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	// var cert_address = ABI["networks"][keys[keys.length-1]]["address"];

	var provider = new Web3.providers.HttpProvider("http://localhost:8545");
	Credophy.setProvider(provider);

	var deployed;
	Credophy.deployed().then(function(instance) {
		deployed = instance;
		return deployed.issueCert('0x9b8bb3fd6b7551ae1777f15d6836f12c38c20b03', jdata['title'], jdata['_status'], jdata['uint'], jdata['_end_date'], {from: web3.eth.accounts[1], gas: 4700000});
	}).then(function(result) {
		console.log(result);
		return result;
	}).catch(function(err) {
		console.log(err);
	  	return err;
	});
// };