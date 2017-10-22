pragma solidity ^0.4.4;

contract Credophy {

	struct Certificate {
        string title;
        string status;
        uint start_date;
        uint end_date;
        string meta_data;
        address issuer;
        address recipient;
    }

	address[] public issuers;
	address[] public recipients;

	Certificate[] public certificates_ids;

	mapping (address => uint) certificates;


	function issueCert(address recipient, string _title, string _status, uint _start_date, uint _end_date) public returns (uint) {
		certificates_ids.length++;
		certificates_ids[certificates_ids.length-1].title = _title;
		certificates_ids[certificates_ids.length-1].status = _status;
		certificates_ids[certificates_ids.length-1].start_date = _start_date;
		certificates_ids[certificates_ids.length-1].end_date = _end_date;
		certificates_ids[certificates_ids.length-1].issuer = msg.sender;
		certificates[recipient] = certificates_ids.length;
		return certificates_ids.length;
	}

	function getCert(uint id) constant returns(string, string, uint, uint, address, address) {
		return (certificates_ids[id].title, certificates_ids[id].status, certificates_ids[id].start_date, certificates_ids[id].end_date, certificates_ids[id].issuer, certificates_ids[id].recipient);
	}
}