// $(document).ready(function(){
//     localStorage.setItem('k', 'k'); // add constant user in the local storge
// 	$.validator.addMethod('validateUser', function (pass, element) {
// 		let input_username = document.getElementById("username").value;
// 		let localstorage_password = localStorage.getItem(input_username);
// 		if(localstorage_password === null) {
// 			return false;
// 		}
// 		else if(localstorage_password === pass) {
// 			return true;
// 		}
// 		return false;
// 	});

/* ======================================================================
  Author Custom JavaScript
====================================================================== */
// Loop through Array of Objects
var objPeople = [
	{ // Object @ 0 index
		username: "k",
		password: "k"
	}

]

function getInfo() {
	var username = document.getElementById('login-username').value
	var password = document.getElementById('login-pass').value

	for(var i = 0; i < objPeople.length; i++) {
		// check is user input matches username and password of a current index of the objPeople array
		if(username == objPeople[i].username && password == objPeople[i].password) {
			alert(username + " is logged in!!!")
            document.getElementById('login-username').value = ""
            document.getElementById('login-pass').value = ""
			switchScreen('settings')
			return
		}
	}
    document.getElementById('login-username').value = ""
    document.getElementById('login-pass').value = ""
	alert("incorrect username or password, try again")
}