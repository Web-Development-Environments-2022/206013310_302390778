var userOnline;
function getInfo() {
	var username = document.getElementById('login-username').value;
	userOnline = username;
	var password = document.getElementById('login-pass').value;
	if (localStorage.getItem(username) == password){
		document.getElementById('login-username').value = "";
		document.getElementById('login-pass').value = "";
		document.getElementById("userName").innerText="User name: " + userOnline;
		document.getElementById("userName").style.color="white";
		switchScreen('settings');
		return;
	}
    document.getElementById('login-pass').value = "";
	alert("incorrect deatails, try again");
}