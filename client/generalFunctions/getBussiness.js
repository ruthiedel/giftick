
 // פונקציה שמקבלת מייל של בית עסק ומחזירה את התמונה של בית העסק

 function getPicture(email) {
    return fetch("http://localhost:3000/bussiness/picture/" + email)
      .then(function(response) {
        if (!response.ok) {
          alert("HTTP error, status = " + response.status);
        }
        return response.blob();
      });
  }



  //פונקצייה שמקבלת מהשרת את כל בתי העסק 
  function getCards() {
    return new Promise(function(resolve, reject) {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/bussiness",
        "method": "GET",
        "headers": {
          "Cache-Control": "no-cache",
          "Postman-Token": "a9312cd4-293c-1de8-2932-1eddeb22e19b"
        }
      };
  
      $.ajax(settings).done(function(response) {
        console.log(response)
        var cards = response;
        resolve(cards);
      }).fail(function(error) {
        alert("something get worng")
      });
    });
  }
  ///פונקצייה שמביאה את כל הכרטיסים שהסכום שלהם נמוך מהסכום המבוקש
function getByCost(cost)
{
  return new Promise(function(resolve, reject) {
    var settings = {
      "url": "http://localhost:3000/bussiness/min_amount/"+cost,
      "method": "GET",
      "timeout": 0,
    };

    $.ajax(settings).done(function(response) {
      
      resolve(response);
    }).fail(function(error) {
      alert("something get worng")
    });
  });
}
//פונקצייה שמחזירה כרטיסים בעל שם קטוגריה מבוקשת
function getByCategory(category) {
  return new Promise(function(resolve) {
    var settings = {
      "url": "http://localhost:3000/bussiness/category/" + category,
      "method": "GET",
      "timeout": 0
    };

    $.ajax(settings).done(function(response) {
      resolve(response);
    }).fail(function(error)
    {
      alert("something get worng")
    });
  });
}
//פונקצייה שמחזירה כרטיס בעל שם בית עסק מבוקש
function getByName(name)
{
  return new Promise(function(resolve, reject) {
    var settings = {
      "url": "http://localhost:3000/bussiness/name/"+name,
      "method": "GET",
      "timeout": 0,
    };

    $.ajax(settings).done(function(response) {
      resolve(response);
    }).fail(function(error) {
      alert("something get worng")
    });
  });
}


function getByDetails(name,amount,category)
{
  return new Promise(function(resolve, reject) {
  var settings = {
    "url": `http://localhost:3000/bussiness/details?name=${name}&amount=${amount}&category=${category}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "name": name,
      "amount":amount,
      "category": category
    }),
  
  };
  
  $.ajax(settings).done(function (response) {
    resolve(response);
  }).fail(function(error)
  {
    alert("something get worng")
  });
});
}

//פונקצייה שמחזירה את בית העסק מבסיס הנתונים בהתבסס על המייל הנתון
function getItemDetails(email) {
    return new Promise(function (resolve, reject) {
        var settings = {
            "url": "http://localhost:3000/bussiness/email/" + email,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            resolve(response);
        }).fail(function(error) {
          alert("something get worng")
        });
    });
}
