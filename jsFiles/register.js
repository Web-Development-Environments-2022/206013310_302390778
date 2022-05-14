$(document).ready(function(){
	localStorage.setItem('k', 'k');
    //check if username already exists
	$.validator.addMethod('fineUserName', function (value, element) {
		is_valid = localStorage.getItem(value);
		is_item = localStorage[value];
		if(is_item==null)
			return true;
		else return false;
	});

	$.validator.addMethod('strongPassword', function(value, element) {
		if(value.length<6 || !(/[a-zA-Z]/g).test(value) || !(/\d/.test(value)) ){
            return false;
        }
        return true;
    },)

	

	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
	},); 

// 	jQuery.validator.addMethod("fullname", function(value, element) {
//   	if (/^[a-z][- a-z]*[- ]{2}[- a-z]*[a-z]$/i.test(value))
//     	return true;
//   	 else
//     	return false;
// 	},);

// 	$(function() {
//         $('#fullname').on('keydown', function(e) {
//             if (e.which == 32){
//                 window.alert('Space Detected');
//             }
//         });
// });
	
	//REGISTER
	$("#register-form").validate({
		rules: {
			username: {
				required: true,
				validateUsername: true
			},
			password: {
				required: true,
				//minlength: 6,
				strongPassword: true
			},
			fullname: {
				required: true,
				lettersonly: true
			},
			email: {
				required: true,
				email: true
			},
			birthdate: {
				required: true
			}
		},
		messages: {
			username: {
				required: "Required field",
				validateUsername: "Sorry, this username is taken. Try something else :)"
			},
			password: {
				required: "Required field",
				strongPassword: "6 chars long and at least one number, upper and lower."
			},
			fullname: {
				required: "Required field",
				lettersonly: "Full name can be only letters and spaces."
			},
			email:{
				required: "Required field",
				email: "Invaild e-mail. Try again."
			},
			birthdate: {
				required: "Required field"
			}
		}
		,submitHandler: function (){
			register();
			switchScreens(`Login-screen`);
			//reset form details
			let form = $("#register-form");
			form[0].reset();
		}
	});	
});


function register() {
	let username = document.getElementById("reg-name").value;
	let password = document.getElementById("reg-pass").value;
    objPeople[username] = password;
    switchScreen('Login-screen');
};