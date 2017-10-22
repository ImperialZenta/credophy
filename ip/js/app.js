// import { Web3 } from '@web3.min.js';
// import { TruffleContract } from '@truffle-contract.js';
// import { ABI } from '@./smart_contract/build/contracts/Credophy.json';
import { default as Web3} from 'web3';
import { default as TruffleContract } from 'truffle-contract'
import ABI from 'build/contracts/Credophy.json'

angular.module('ipApp', [])

  .controller('mainController', function ($scope, $http) {

    var ip = this;

    var config = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8;'
      }
    }

    ip.credentialData = {};

    ip.addCredential = function () {
      // var Web3 = require('web3');
      // var TruffleContract = require("truffle-contract");
      // var ABI = require("./smart_contract/build/contracts/Credophy.json");

      var data = {
        title: ip.credentialData.title,
        name: ip.credentialData.name,
        major: ip.credentialData.major,
        start: ip.credentialData.start,
        end: ip.credentialData.end,
      };

      var Credophy = TruffleContract(ABI);
      // var jdata = JSON.parse('{"recipient": "0x9b8bb3fd6b7551ae1777f15d6836f12c38c20b03", "title": "idontcare", "_status": "idontcare", "uint": 1234, "_end_date": 1234}');
      // console.log(jdata["id"]);
      // var keys = Object.keys(ABI["networks"]);
      var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      // var cert_address = ABI["networks"][keys[keys.length-1]]["address"];
    
      var provider = new Web3.providers.HttpProvider("http://localhost:8545");
      Credophy.setProvider(provider);
    
      var deployed;
      Credophy.deployed().then(function(instance) {
        deployed = instance;
        return deployed.issueCert(ip.credentialData.name, ip.credentialData.title, "null", ip.credentialData.start, ip.credentialData.end, {from: web3.eth.accounts[1], gas: 4700000});
      }).then(function(result) {
        console.log(result);
        return result;
      }).catch(function(err) {
        console.log(err);
        return err;
    
    
    
        // return $http.post('http://localhost:8888/', data, config)
        //   .success(ip.credentialData = {})
    });
    };
  });