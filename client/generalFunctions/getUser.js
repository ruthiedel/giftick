 //פונקצייה המזהה מי הוא המשתמש תוך שימוש באיחסון מקומי ושליחת בקשת שרת
 function getUser() {
    return new Promise(function (resolve, reject) {
      const token = localStorage.getItem('token');
      if(token){
    
      var settings = {
        "url": "http://localhost:3000/user/email",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "authorization":token,
          "Content-Type": "application/json"
        },
      };
  
       $.ajax(settings).done(function (response) {
         resolve(response);
      }).fail(function(error) {
        alert("something get worng")
      });
    }
    else{
      alert("you must log in or sign in");
    }
    });
  
  }

   function addToPackage(name,price,email)
  {
    getUser().then(function(user) {
     
      user.package = user.package || [];
      
      
      user.package.push({name: name, price: price,email:email });
      const token = localStorage.getItem('token')
      var settings = {
        "url": "http://localhost:3000/user",
        "method": "PUT",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "authorization":token
        },
        "data": JSON.stringify(user),
      };
      
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      }).fail(function(error) {
        alert("something get worng")
      });
    });
    let  dialog = document.getElementById('dialog');
    if(dialog)
    {
      dialog.parentNode.removeChild(dialog);
    }
  }