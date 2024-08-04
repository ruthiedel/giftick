window.onload=function(){document.getElementById('login').addEventListener('submit', function (event) {
 event.preventDefault(); // Prevent the default form submission
  
  // Handle the form submission here
    addUser()
  });
}
  function addUser()
  {
    // Get the user input values
    var email = document.getElementById('email').value;
    var pin = document.getElementById('password').value;
    // Create the request data object
    var requestData = {
      email: email,
      pin:pin
    };
    var settings = {
        "url": "http://localhost:3000/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          
          "email":email,
          "pin": pin
        }),
      };
      $.ajax(settings).done(function (response) {
        
        if(response!='user is not in access')
        {
            localStorage.setItem('token',response)
             window.location.href = "../catalog/katalog.html";
         
        }
         else{
            alert("you hav not signed in to our website")
            window.location.href = "../signin/signin.html";   
              
         }
      }).fail(function(error) {
        reject(error);
      });
    }