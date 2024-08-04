window.onload=function(){
document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Handle the form submission here
  addUser()
});
}
function addUser()
{
  // Get the user input values
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var pin = document.getElementById('password').value;
  if(isValidEmail(email))
  {
  // Create the request data object
  var requestData = {
    name: name,
    email: email,
    phone: phone,
    pin: pin
  };
  var settings = {
      "url": "http://localhost:3000/signin",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(requestData),
    };

    console.log("aaa")
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      if(response!="adduser failed because this user is allready in the DB")
      { 
          localStorage.setItem('token',response)
           window.location.href = "../catalog/katalog.html";
       
      }
       else{
          alert("something get worng try to resign ")
       }
    }).fail(function(error) {
      reject(error);
    });
  }
  else{
    alert("an invalid email")
  }
}



function isValidEmail(email) {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailPattern.test(email);
}