document.getElementById('regist').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Handle the form submission here
  addBussiness()
})
getCategories();


function addBussiness() {
  var name = document.getElementById('businessName').value;
  var min_amount = document.getElementById('cardAmount').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var short_descreption = document.getElementById('description').value;
  var location = document.getElementById('location').value;
  var years = document.getElementById("years").value;
  var category = document.getElementById("categoryInput").value;
  var date = new Date();
  console.years;
  var picture = document.getElementById('image').files[0]; // Get the file object


  var formData = new FormData();
  formData.append('name', name);
  formData.append('years', years);
  formData.append('start_date', date)
  formData.append('min_amount', min_amount);
  formData.append('phone', phone);
  formData.append('category', category);
  formData.append('email', email);
  formData.append('short_descreption', short_descreption);
  formData.append('location', location);
  formData.append('picture', picture); // Append the file to the form data

  var settings = {
    url: 'http://localhost:3000/bussiness',
    method: 'POST',
    processData: false,
    contentType: false,
    data: formData
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    if (response == "add busssiness success") {
      alert('Your service cost: ' + years * 2000 + '$');
      alert(response);
      window.location.href = "../homepage/homepage.html";
    }
    else {
      alert("you are allready Exists in our DB");
    }
  }).fail(function (error) {
    reject(error);
  });

}


function addCategory() {
  var category = document.getElementById("add-category").value;
  console.log(category);

  if (category != "") {
    var settings = {
      "url": "http://localhost:3000/category",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "name": category
      }),
    };

    $.ajax(settings).done(function (response) {
      alert("add category suucess")
      var categoryList = document.getElementById('categoryList');
      categoryList.innerHTML = "";
      getCategories();
      document.getElementById("add-category").value='';
    }).fail(function(error)
    {
      alert("there is a problem");
    });
  }


}

function validateAmount() {
  var amountInput = document.getElementById("cardAmount");
  var amount = parseInt(amountInput.value);

  if (amount < 50 || amount % 50 !== 0) {
    alert("The card amount should be greater than 50 and in multiples of 50.");
    amountInput.value = "";
  }
}

function previewImage(event) {
  var imagePreview = document.getElementById("imagePreview");
  imagePreview.src = URL.createObjectURL(event.target.files[0]);
}