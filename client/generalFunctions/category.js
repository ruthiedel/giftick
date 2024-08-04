//שפיכת הקטוגריות לתיבת החיפוש

function getCategories() {
    var settings = {
      "url": "http://localhost:3000/category",
      "method": "GET",
      "timeout": 0,
    };
  
    $.ajax(settings).done(function (response) {
      var categoryList = document.getElementById('categoryList');
  
      // Fill the data list with categories from the response
      response.forEach(function (category) {
        var option = document.createElement('option');
        option.value = category.name+' ';
        categoryList.appendChild(option);
      });
    }).fail(function(error) {
      alert("something get worng")
    });
  }

  