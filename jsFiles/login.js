function getInfo() {
	var username = document.getElementById('login-username').value
	var password = document.getElementById('login-pass').value
	if (localStorage.getItem(username) == password){
		document.getElementById('login-username').value = ""
		document.getElementById('login-pass').value = ""
		switchScreen('settings')
		return
	}
    // document.getElementById('login-username').value = ""
    document.getElementById('login-pass').value = ""
	alert("incorrect deatails, try again")
}