
//יצירת הקטלוג הדינאמי
function createCatalog(cards) {

    var giftCardsContainer = document.getElementById("gift-cards-container");
    cards.forEach(function (giftCard) {
        var timeNow = new Date();
        var startdate = new Date(giftCard.start_date);

        if (startdate.getFullYear() + giftCard.years >= timeNow.getFullYear()) {
            var cardDiv = document.createElement("div");
            cardDiv.className = "gift-card";
            cardDiv.id = giftCard.email;
            cardDiv.addEventListener('click', function () {
                // Show item dialog
                showItemDialog(giftCard);
            });

            var cardImage = document.createElement("img");
            getPicture(giftCard.email).then(function (response) {
                var reader = new FileReader();
                reader.readAsDataURL(response);
                console.log(response)
                reader.onload = function () {
                    cardImage.src = reader.result;
                };

            })
                .catch(function (error) {
                    console.log("Error:", error);
                });
            cardImage.alt = giftCard.name;
            // cardName.className = "gift-card-name"
            cardDiv.appendChild(cardImage);

            var cardName = document.createElement("h3");
            cardName.textContent = giftCard.name;
            cardDiv.appendChild(cardName);

            giftCardsContainer.appendChild(cardDiv);
        }
        else {
            console.log(giftCard)
            //מחיקת הבית עסק כיוון שניגמר לו הזמן
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:3000/bussiness",
                "method": "DELETE",

                "headers": {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Postman-Token": "c54046e2-d899-798c-394f-bcbd4357ca5a"
                },
                "processData": false,
                "timeout": 0,
                "data": JSON.stringify(giftCard)
            }

            $.ajax(settings).done(function (response) {
                sendEmailToBussiness(giftCard.email)
                console.log(response);
            }).fail(function (error) {
                alert("something get worng")
            });
        }
    });


}



// פונקציה שמקבלת בית עסק ופותחת חלונית של הוסף לסל או לקנות
function showItemDialog(item) {

    // Create dialog element
    var dialog = document.createElement('div');
    dialog.className = 'dialog';
    dialog.id = 'dialog'



    var closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.style.borderRadius = "50%";
    closeButton.style.width = "30px";
    closeButton.style.height = "30px";
    closeButton.style.backgroundColor = "red";
    closeButton.style.color = "#fff";
    closeButton.onclick = function () {
        document.body.removeChild(dialog);
    };
    dialog.appendChild(closeButton)
    //create h2 element
    var name = document.createElement('h2')
    name.innerHTML = item.name;
    dialog.appendChild(name)

    // Create image element
    var image = document.createElement('img');
    getPicture(item.email).then(function (response) {
        var reader = new FileReader();
        reader.readAsDataURL(response);
        console.log(response)
        reader.onload = function () {
            image.src = reader.result;
        };

    })
        .catch(function (error) {
            console.log("Error:", error);
        });
    image.style.width = "33%";
    image.style.float = "left";
    dialog.appendChild(image);
    //a contain div
    var contentDiv = document.createElement('div');
    contentDiv.style.marginLeft = "35%";
    dialog.appendChild(contentDiv);

    var price = document.createElement("h4")
    price.innerHTML = "min_cost:" + item.min_amount + "$"
    contentDiv.appendChild(price)
    // Create description element
    var description = document.createElement('p');
    description.innerHTML = item.short_descreption;
    contentDiv.appendChild(description);

    // Create input element for choosing the amount
    var amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.min = item.min_amount;
    amountInput.placeholder = 'Enter amount';
    contentDiv.appendChild(amountInput)

    // Create add to basket button
    var addToBasketButton = document.createElement('button');
    addToBasketButton.textContent = 'Add to Basket';

    addToBasketButton.addEventListener('click', function () {
        var amount = parseInt(amountInput.value);
        if (amount >= item.min_amount) {
            console.log('Item added to basket:', item);
            addToPackage(item.name, amount, item.email);
        } else {
            alert('Amount is less than minimum amount');
        }
    });
    contentDiv.appendChild(addToBasketButton);

    // Create new buy button
    var buyButton = document.createElement('button');
    buyButton.textContent = 'Buy';
    buyButton.addEventListener('click', function () {
        var amount = parseInt(amountInput.value);
        if (amount >= item.min_amount) {
            showGiftForm(amount, item.name);
            console.log('Buy button clicked for item:', item);

        }
        else {
            alert('Amount is less than minimum amount');
        }

    });
    contentDiv.appendChild(buyButton);


    // Add dialog to the body element
    document.body.appendChild(dialog);

    // Center the dialog on the screen
    dialog.style.top = Math.max((window.innerHeight / 2 - dialog.offsetHeight / 2), 400) + 'px';
    dialog.style.left = (window.innerWidth / 2 - dialog.offsetWidth / 2) + 'px';
}






function showGiftForm(amount, bussinessname) {
    let dialog = document.getElementById('dialog');
    if (dialog) {
        dialog.parentNode.removeChild(dialog);
    }

    // Create the gift form elements
    var giftForm = document.createElement("div");
    giftForm.className = "gift-form";
    giftForm.id = "gift-form";


    var heading = document.createElement("h2");
    heading.textContent = "Send a Gift";

    var closeButton = document.createElement("button");
    closeButton.className = "close-button"
    closeButton.textContent = "X";

    closeButton.onclick = function () {
        document.body.removeChild(giftForm);
    };

    var recipientEmailInput = document.createElement("input");
    recipientEmailInput.type = "email";
    recipientEmailInput.id = "recipientEmail";
    recipientEmailInput.placeholder = "Recipient's Email";
    recipientEmailInput.required = true;

    var greetingTextarea = document.createElement("textarea");
    greetingTextarea.id = "greeting";
    greetingTextarea.placeholder = "Enter your greeting";
    greetingTextarea.rows = 5;
    greetingTextarea.required = true;


    var form = document.createElement('form');

    // Card Number Input
    const cardNumberLabel = document.createElement('label');
    cardNumberLabel.setAttribute('for', 'cardNumber');
    cardNumberLabel.textContent = 'Card Number:';
    form.appendChild(cardNumberLabel);

    const cardNumberInput = document.createElement('input');
    cardNumberInput.setAttribute('type', 'text');
    cardNumberInput.setAttribute('id', 'cardNumber');
    cardNumberInput.setAttribute('required', 'true');
    form.appendChild(cardNumberInput);

    // Expiration Date Input
    const cardExpiryLabel = document.createElement('label');
    cardExpiryLabel.setAttribute('for', 'cardExpiry');
    cardExpiryLabel.textContent = 'Expiration Date:';
    form.appendChild(cardExpiryLabel);

    const cardExpiryInput = document.createElement('input');
    cardExpiryInput.setAttribute('type', 'text');
    cardExpiryInput.setAttribute('id', 'cardExpiry');
    cardExpiryInput.setAttribute('required', 'true');
    form.appendChild(cardExpiryInput);

    // CVV Input
    const cardCvvLabel = document.createElement('label');
    cardCvvLabel.setAttribute('for', 'cardCvv');
    cardCvvLabel.textContent = 'CVV:';
    form.appendChild(cardCvvLabel);

    const cardCvvInput = document.createElement('input');
    cardCvvInput.setAttribute('type', 'text');
    cardCvvInput.setAttribute('required', 'true');
    cardCvvInput.setAttribute('id', 'cardCvv');
    form.appendChild(cardCvvInput);




    var buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between";
    buttonContainer.style.marginTop = "20px";


    var sendButton = document.createElement("button");
    sendButton.textContent = "BUY";
    sendButton.className = "send-button"
    sendButton.addEventListener('click', function () {
        sendGift(amount, bussinessname)
    });

    // Append the elements to the gift form
    giftForm.appendChild(closeButton);
    giftForm.appendChild(heading);

    giftForm.appendChild(recipientEmailInput);
    giftForm.appendChild(greetingTextarea);
    giftForm.appendChild(form);
    buttonContainer.appendChild(sendButton);
    giftForm.appendChild(buttonContainer);

    // Append the gift form to the document body
    document.body.appendChild(giftForm);

    // Show the gift form
    giftForm.style.display = "block";
}