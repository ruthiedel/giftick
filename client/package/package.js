createPackage();

function createPackage() {

    getUser().then(function (user) {
        let contain = document.getElementById("contain-package");
        user.package.forEach(function (item) {
            let product = document.createElement("div");
            product.className = "item";
            product.id = item.email + item.price;

            let email = item.email;

            getItemDetails(email).then(function (bussiness) {

                let div1 = document.createElement("div")
                div1.className = "div-in-item-1"

                let div2 = document.createElement("div")
                div1.className = "div-in-item-2"

                let div3 = document.createElement("div")
                div1.className = "div-in-item-3"

                let picture = document.createElement("img");
                getPicture(email).then(function (response) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        picture.src = reader.result;
                    };
                    reader.readAsDataURL(response);
                    console.log(response)
                })
                    .catch(function (error) {
                        console.log("Error:", error);
                    });
                picture.alt = bussiness.name;
                picture.className = "img-in-item"

                div3.appendChild(picture);

                let price = document.createElement("h4")
                price.innerHTML = item.price;
                price.className = 'price-in-item';

                let description = document.createElement("p")
                description.innerHTML = bussiness.short_descreption
                description.className = "p-in-item";

                div2.appendChild(price);
                div2.appendChild(description);

                let buyButton = document.createElement("button")
                buyButton.innerHTML = "Buy"
                buyButton.className = "button-in-item";
                buyButton.addEventListener('click', function () {

                    showGiftForm([{ email: bussiness.email, price: item.price, name: item.name }]);

                });


                let removeButton = document.createElement("button")
                removeButton.innerHTML = "Remove"
                removeButton.className = "button-in-item";
                removeButton.addEventListener("click", function () {
                    removeItem(bussiness.email, item.price);
                })

                div1.appendChild(buyButton);
                div1.appendChild(removeButton);


                product.appendChild(div1);
                product.appendChild(div2);
                product.appendChild(div3);
            })

            contain.appendChild(product)

        })
    })
}




function showGiftForm(arr) {
    let dialog = document.getElementById('dialog');
    if (dialog) {
        dialog.parentNode.removeChild(dialog);
    }

    // Create the gift form elements
    var giftForm = document.createElement("div");
    giftForm.className = "gift-form";
    giftForm.id = "gift-form";

    // Add styling to the gift form
    giftForm.style.width = "300px";
    giftForm.style.padding = "20px";
    giftForm.style.border = "1px solid #ccc";
    giftForm.style.borderRadius = "5px";

    var heading = document.createElement("h2");
    heading.textContent = "Send a Gift";

    var closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.style.borderRadius = "50%";
    closeButton.style.width = "30px";
    closeButton.style.height = "30px";
    closeButton.style.backgroundColor = "red";
    closeButton.style.color = "#fff";
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
    form.appendChild(cardNumberInput);

    // Expiration Date Input
    const cardExpiryLabel = document.createElement('label');
    cardExpiryLabel.setAttribute('for', 'cardExpiry');
    cardExpiryLabel.textContent = 'Expiration Date:';
    form.appendChild(cardExpiryLabel);

    const cardExpiryInput = document.createElement('input');
    cardExpiryInput.setAttribute('type', 'text');
    cardExpiryInput.setAttribute('id', 'cardExpiry');
    form.appendChild(cardExpiryInput);

    // CVV Input
    const cardCvvLabel = document.createElement('label');
    cardCvvLabel.setAttribute('for', 'cardCvv');
    cardCvvLabel.textContent = 'CVV:';
    form.appendChild(cardCvvLabel);

    const cardCvvInput = document.createElement('input');
    cardCvvInput.setAttribute('type', 'text');
    cardCvvInput.setAttribute('id', 'cardCvv');
    form.appendChild(cardCvvInput);


    var buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between";
    buttonContainer.style.marginTop = "20px";

    var sendButton = document.createElement("button");
    sendButton.textContent = "SEND";
    sendButton.style.borderRadius = "5px";
    sendButton.style.padding = "10px 20px";
    sendButton.style.backgroundColor = "green";
    sendButton.style.color = "#fff";
    sendButton.addEventListener("click", function () {
        sendGift(arr);
    })

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

async function sendGift(arr) {
    var recipientEmail = document.getElementById("recipientEmail").value;
    var greeting = document.getElementById("greeting").value;
    var cardCvvInput = document.getElementById("cardCvv").value;
    var cardExpiryInput = document.getElementById("cardExpiry").value;
    var cardNumberInput = document.getElementById("cardNumber").value;
    if (isValidEmail(recipientEmail) && cardCvvInput != "" && cardExpiryInput != "" && cardNumberInput != "") {
        console.log("Recipient's Email: " + recipientEmail);
        console.log("Greeting: " + greeting);

        var giftfrom = document.getElementById("gift-form")
        if (giftfrom) {
            giftfrom.parentNode.removeChild(giftfrom);
        }

        // המתנות נמחקות רק אחרי שהפונקציה removeItem מחזירה את הנתונים המעודכנים
        for (let item of arr) {
            const loadingOverlay = document.createElement('div');
            loadingOverlay.classList.add('loading-overlay');

            // Create a spinner element
            const spinner = document.createElement('div');
            spinner.classList.add('spinner');
            loadingOverlay.appendChild(spinner);

            document.body.appendChild(loadingOverlay);
            sendEmailToClient('you recived agift card from your freind to ' + item.name + ' with ' + item.price + '$', greeting, recipientEmail, cardCvvInput, cardExpiryInput, cardNumberInput)
                .then((res) => {
                    // Remove the loading overlay
                    loadingOverlay.remove();
                    if (res === "Gift sent successfully!") {
                        removeItem(item.email, item.price);
                    }
                })
                .catch((error) => {
                    // Handle errors
                    console.error(error);
                    loadingOverlay.remove();
                });

        }


    }
    else {
        alert("please give us all your cirrect details")
    }
}

function removeItem(email, price) {
    return new Promise((resolve, reject) => {
        let div = document.getElementById(email + price);
        div.parentNode.removeChild(div);
        const token = localStorage.getItem('token');
        getUser().then(user => {
            user.package = user.package.filter(item => item.email !== email || item.price !== price);

            var settings = {
                "url": "http://localhost:3000/user",
                "method": "PUT",
                "timeout": 0,
                "headers": {
                    "authorization": token,
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify(user),
            };

            $.ajax(settings)
                .done(response => {
                    console.log(response);
                    resolve();
                })
                .fail(error => {
                    console.log(error);
                    reject(error);
                });
        })
    })
}




function BuyAllPackage() {
    getUser().then(function (user) {
        if (user.package.length > 0) {
            showGiftForm(user.package);
        }
    })
}




