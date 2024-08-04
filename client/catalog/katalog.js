window.onload = function () {
  showAllCards();
  getCategories();
}


function addToPackage(name, price, email) {
  getUser().then(function (user) {

    user.package = user.package || [];


    user.package.push({ name: name, price: price, email: email });
    const token = localStorage.getItem('token')
    var settings = {
      "url": "http://localhost:3000/user",
      "method": "PUT",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "authorization": token
      },
      "data": JSON.stringify(user),
    };


    $.ajax(settings).done(function (response) {
      console.log(response);
    }).fail(function (error) {
      alert("something get worng")
    });
  });
  let dialog = document.getElementById('dialog');
  if (dialog) {
    dialog.parentNode.removeChild(dialog);
  }
}




function sendGift(amount, bussinessname) {
  var recipientEmail = document.getElementById("recipientEmail").value;
  var greeting = document.getElementById("greeting").value;
  var cardCvvInput = document.getElementById("cardCvv").value;
  var cardExpiryInput = document.getElementById("cardExpiry").value;
  var cardNumberInput = document.getElementById("cardNumber").value;


  if (isValidEmail(recipientEmail) && cardCvvInput != "" && cardExpiryInput != "" && cardNumberInput != "") {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.classList.add('loading-overlay');

    // Create a spinner element
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    loadingOverlay.appendChild(spinner);

    document.body.appendChild(loadingOverlay);

    // Perform the long operation
    sendEmailToClient('you recived agift card from your freind to ' + bussinessname + ' with ' + amount + '$', greeting, recipientEmail, cardCvvInput, cardExpiryInput, cardNumberInput)
      .then(() => {
        // Remove the loading overlay
        loadingOverlay.remove();
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        loadingOverlay.remove();
      });
  }
  else {
    alert("please give us all your cirrect details")
  }

}

//פןמקצייה שמייצרת קטלוג של כל הכרטיסים
function showAllCards() {
  let divs = document.querySelectorAll(".gift-card")
  divs.forEach(function (div) {
    div.parentNode.removeChild(div);
  }
  )
  getCards().then(function (cards) {
    createCatalog(cards)
  })
}
//פונקצייה שמיצרת קטלוג לפי הסכום המבוקש
function showUnderThen() {

  var cost = document.getElementById("maxAmount").value
  if (cost) {
    document.getElementById("businessName").value = '';
    document.getElementById("categoryInput").value = '';

    getByCost(cost).then(function (cards) {
      if (cards != "Not in access") {
        let divs = document.querySelectorAll(".gift-card")
        divs.forEach(function (div) {
          div.parentNode.removeChild(div);
        }
        )
        createCatalog(cards)

      }
      else {
        alert("no card fit your demind")
      }
    })
  }
}
//פונקצייה שמיצרת קטלוג לפי השם המבוקש
function showByName() {
  var name = document.getElementById("businessName").value;
  if (name) {
    document.getElementById("categoryInput").value = '';
    document.getElementById("maxAmount").value = '';

    getByName(name).then(function (cards) {
      if (cards != "Not in access") {
        let divs = document.querySelectorAll(".gift-card")
        divs.forEach(function (div) {
          div.parentNode.removeChild(div);
        }
        )
        createCatalog(cards)
      }
      else {
        alert("no card fit your demind")
      }
    })
  }
}

//פונקצייה שמיצרת קטלוג לפיקטגוריה המבוקשת
function showByCategory() {
  var name = document.getElementById("categoryInput").value;
  if (name) {
    document.getElementById("maxAmount").value = '';
    document.getElementById("businessName").value = '';
    getByCategory(name).then(function (cards) {
      if (cards != "Not in access") {
        let divs = document.querySelectorAll(".gift-card")
        divs.forEach(function (div) {
          div.parentNode.removeChild(div);
        }
        )
        createCatalog(cards)
      }
      else {
        alert("no card fit your demind")
      }
    })
  }
}


function showByDetails() {
  var category = document.getElementById("categoryInput").value;
  if (category == "") {
    category = "?";
  }
  var bussinessname = document.getElementById("businessName").value;
  if (bussinessname == "") {
    bussinessname = "?";
  }
  var cost = document.getElementById("maxAmount").value;
  if (cost == "") {
    cost = "?";
  }
  getByDetails(bussinessname, cost, category).then(function (cards) {
    if (cards != "Not in access" && cards != "give us more details") {
      let divs = document.querySelectorAll(".gift-card")
      divs.forEach(function (div) {
        div.parentNode.removeChild(div);
      }
      )
      createCatalog(cards)
    }
    else {
      if (cards != "give us more details")
        alert("no card fit your demind")
    }
  }
  )

}