
 //פונקציה ששולחת מייל ללקוח שקיבל מתנה 
function sendEmailToClient(subject,text,email,cardCvv,cardExpiry,cardNumber)
{
  return new Promise(function (resolve, reject) {
  makeBuy(cardCvv,cardExpiry,cardNumber).then(function(emailtoken){
  var data = JSON.stringify({
    "email":email,
    "subject":subject,
    "text":text
})
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/email/client",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "authorization":emailtoken
    },
    "processData": false,
    "data": data
  }
  
  $.ajax(settings).done(function (response) {
    var giftfrom = document.getElementById("gift-form")
    if(giftfrom)
    {
       giftfrom.parentNode.removeChild(giftfrom);
    }
    alert("Gift sent successfully!");
    resolve("Gift sent successfully!")
  }).fail(function(error) {
    alert("something get worng")
  });
  })
})
}



//פונקצייה ששולחת מייל לבית עסק שזמן המנוי שלו ניגמר
function sendEmailToBussiness(email)
{
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/email/bussiness",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Postman-Token": "097f4c67-0018-c931-2b9c-2de4f3ab3640"
    },
    "processData": false,
    "data":JSON.stringify({
        "email":email
    })
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  }).fail(function(error) {
    alert("something get worng")
  });

}


function isValidEmail(email) {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

function makeBuy(cardCvv,cardExpiry,cardNumber)
{
  return new Promise(function (resolve, reject) {
  var settings = {
    "url": "http://localhost:3000/buy",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "cardCvv": cardCvv,
      "cardExpiry":cardExpiry,
      "cardNumber":cardNumber
    }),
  };
  
  $.ajax(settings).done(function (response) {
    resolve(response);
      }).fail(function(error) {
        alert("something get worng")
      });
})
}