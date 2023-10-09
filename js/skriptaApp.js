//** Function that determines the users username and adds it to the headline **//
function findMyUser() {
    let query = window.location.search.substring(1);
    let data = query.split("&");
    let myUser;

    if (data.length < 3) {
        let email = data[0].substring(7).replace("%40", "@");


        for (i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                myUser = users[i].username;
            }
        }
    } else {
        myUser = data[0].substring(9);
    }

    let user = document.querySelector('#user');
    user.innerText = " " + myUser;
}

findMyUser();

//** Navbar inner offcanvas close button retruning to navbar menu **//
let buttonCartWidth = window.matchMedia('(max-width: 992px)');
let closeInnerOffcanvasButton = document.querySelector('#innerOffcanvasBtn');
let cartLabel = document.querySelector('.cart-label');
buttonCartWidth.addEventListener('change', buttonCartWidthMedia);

function buttonCartWidthMedia(event) {
    if (event.matches) {
        cartLabel.style.display = "block";
        closeInnerOffcanvasButton.removeAttribute("data-bs-dismiss");
        closeInnerOffcanvasButton.setAttribute("data-bs-toggle", "offcanvas");
        closeInnerOffcanvasButton.setAttribute("data-bs-target", "#offcanvasDarkNavbar");
        closeInnerOffcanvasButton.setAttribute("aria-controls", "offcanvasDarkNavbar");
    } else {
        cartLabel.style.display = "none";
        closeInnerOffcanvasButton.setAttribute("data-bs-dismiss", "offcanvas");
        closeInnerOffcanvasButton.removeAttribute("data-bs-toggle");
        closeInnerOffcanvasButton.removeAttribute("data-bs-target");
        closeInnerOffcanvasButton.removeAttribute("aria-controls");
    }
}

if(buttonCartWidth.matches){
    cartLabel.style.display = "block";
    closeInnerOffcanvasButton.removeAttribute("data-bs-dismiss");
    closeInnerOffcanvasButton.setAttribute("data-bs-toggle", "offcanvas");
    closeInnerOffcanvasButton.setAttribute("data-bs-target", "#offcanvasDarkNavbar");
    closeInnerOffcanvasButton.setAttribute("aria-controls", "offcanvasDarkNavbar");
} else {
    cartLabel.style.display = "none";
    closeInnerOffcanvasButton.setAttribute("data-bs-dismiss", "offcanvas");
    closeInnerOffcanvasButton.removeAttribute("data-bs-toggle");
    closeInnerOffcanvasButton.removeAttribute("data-bs-target");
    closeInnerOffcanvasButton.removeAttribute("aria-controls");
}

//** App categories links functionalities changing depending on selected category **//
let categoryLinks = document.querySelectorAll('.kl');
let vegetablesLink = document.querySelector('#vegetables-link');
let fruitsLink = document.querySelector('#fruits-link');
let otherLink = document.querySelector('#other-link');
let buySection = document.querySelector('.buy');
let categoriesSection = document.querySelector('.categories');
let cartButton = document.querySelector('#cart-button');
let appInputs = document.querySelectorAll('.cab');
categoryLinks.forEach(link => { link.addEventListener('click', changingLinks) });

function changingLinks() {
    buySection.style.display = "block";
    cartButton.style.display = "block";
    appInputs.forEach(input => { input.checked = false });
    if (this.id === "vegetables-link") {
        appInputs[0].checked = true;
        vegetablesCard.style.display = "grid";
        fruitsCard.style.display = "none";
        otherCard.style.display = "none";
    } else if (this.id === "fruits-link") {
        appInputs[1].checked = true;
        vegetablesCard.style.display = "none";
        fruitsCard.style.display = "grid";
        otherCard.style.display = "none";
    } else if (this.id === "other-link") {
        appInputs[2].checked = true;
        vegetablesCard.style.display = "none";
        fruitsCard.style.display = "none";
        otherCard.style.display = "grid";
    }
    categoriesSection.style.display = "none";
}

//** App section buttons color and tables changing depending on selected button **//
let appButtons = document.querySelectorAll('.ab');
let vegetablesCard = document.querySelector('.vegetables-card');
let fruitsCard = document.querySelector('.fruits-card');
let otherCard = document.querySelector('.other-card');
appButtons.forEach(button => { button.addEventListener('click', appBtnFunction) });

function appBtnFunction() {
    if (this.id === "button1") {
        vegetablesCard.style.display = "grid";
        fruitsCard.style.display = "none";
        otherCard.style.display = "none";
    } else if (this.id === "button2") {
        vegetablesCard.style.display = "none";
        fruitsCard.style.display = "grid";
        otherCard.style.display = "none";
    } else if (this.id === "button3") {
        vegetablesCard.style.display = "none";
        fruitsCard.style.display = "none";
        otherCard.style.display = "grid";
    }
}

//** Creating card element function **//
function createElementCard(product) {

    // Creating mycard div
    let mycard = document.createElement("div");
    mycard.className = "card my-card g-col-6 g-col-sm-4 g-col-md-4 g-col-lg-3";
    mycard.id = product.name;

    // Creating card img
    let cardImgTop = document.createElement("img");
    cardImgTop.className = "card-img-top";
    cardImgTop.src = product.imgUrl;
    cardImgTop.alt = product.name;

    // Creating card body div
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Creating card body h5
    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    let cardTitleTextNode = document.createTextNode(product.name);
    cardTitle.appendChild(cardTitleTextNode);

    // Creating select title span
    let selectTitle = document.createElement("span");
    selectTitle.className = "select-title";
    selectTitle.innerText = "Select Market";

    // Creating card select
    let cardSelect = document.createElement("select");
    cardSelect.className = "form-select";
    cardSelect.ariaLabel = "Default select example";

    // Creating select options determining selected option and appending options to card select
    let selectedOption;
    for (let i = 0; i < product.markets.length; i++) {
        let option = document.createElement('option');
        option.value = product.markets[i].price;
        option.innerHTML = product.markets[i].name;
        cardSelect.appendChild(option);
    }

    for (let i = 0; i < Array.from(cardSelect).length; i++) {
        if (Array.from(cardSelect)[i].value != 0) {
            Array.from(cardSelect)[i].selected = "true";
            selectedOption = Array.from(cardSelect)[i];
            break;
        }
    }

    // Creating card text paragraph
    let cardText = document.createElement("p");
    cardText.className = "card-text";

    // Creating price span
    let price = document.createElement("span");
    price.className = "price";
    let priceTextNode = document.createTextNode(selectedOption.value);
    price.appendChild(priceTextNode);

    // Creating unit span
    let unit = document.createElement("span");
    unit.className = "unit";
    let unitTextNode = document.createTextNode(product.unit);
    unit.appendChild(unitTextNode);

    // Creating input message
    let inputMessage = document.createElement("p");
    inputMessage.className = "input-message";

    // Appending price, unit and input-message spans to card text paragraph
    cardText.appendChild(price);
    cardText.appendChild(unit);
    cardText.appendChild(inputMessage);

    // Creating amount wrapper div
    let amountWrapper = document.createElement("div");
    amountWrapper.className = "amount-wrapper";

    // Creating amount input
    let amountInput = document.createElement("input");
    amountInput.className = "amount-input";
    amountInput.type = "number";

    if (product.unitInput != "kg") {
        amountInput.value = 1;
        amountInput.min = "1";
        amountInput.step = "1";
    } else {
        amountInput.value = 0.01
        amountInput.min = "0.01";
        amountInput.step = "0.01";
    }

    // Creating amount button
    let amountButton = document.createElement("button");
    amountButton.className = "btn btn-success amount-button";

    // Creating amount button text node
    let amountButtonTextNode = document.createTextNode("ADD");

    // Creating amount cart icon
    let amountCart = document.createElement("i");
    amountCart.className = "bi bi-cart4 m-1";

    // Appending amount cart icon and amount button text node to amount button
    amountButton.appendChild(amountCart);
    amountButton.appendChild(amountButtonTextNode);

    // Appending amount input and amount button to amount wrapper
    amountWrapper.appendChild(amountInput);
    amountWrapper.appendChild(amountButton);

    // Appending card title, select title, card select, card text and amount wrapper to card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(selectTitle);
    cardBody.appendChild(cardSelect);
    cardBody.appendChild(cardText);
    cardBody.appendChild(amountWrapper);

    // Appending card img and card body to my card
    mycard.appendChild(cardImgTop);
    mycard.appendChild(cardBody);

    return mycard;
}

//** Adding card elements to each card group **//
vegetables.forEach(vegetable => { vegetablesCard.appendChild(createElementCard(vegetable)) });
fruits.forEach(fruit => { fruitsCard.appendChild(createElementCard(fruit)) });
other.forEach(product => { otherCard.appendChild(createElementCard(product)) });

//** Creating offcanvas card element function **//
function createOffcanvasCard(product, amount, price, option) {
    // Creating cart-card div
    let cartCard = document.createElement("div");
    cartCard.className = "card mb-3 cart-card";
    cartCard.id = product.name;

    // Creating cart-card row div
    let cartCardRow = document.createElement("div");
    cartCardRow.className = "row g-0 my-row";

    // Creating image-col div
    let imgCol = document.createElement("div");
    imgCol.className = "col-4 img-col";

    // Creating image-col img
    let img = document.createElement("img");
    img.className = "img-cart";
    img.src = product.imgUrl;
    img.alt = product.name;

    // Appending img to image-col
    imgCol.appendChild(img);

    // Creating body-col div
    let bodyCol = document.createElement("div");
    bodyCol.className = "col-7 body-col";

    // Creating card-body div
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Creating product-title h5
    let productTitle = document.createElement("h5");
    productTitle.className = "product-title";
    productTitle.innerText = product.name;

    // Creating product-select
    let productSelect = document.createElement("select");
    productSelect.className = "form-select product-select";
    productSelect.ariaLabel = "Default select example";

    // Creating select options determining selected option and appending options to card select
    let selectedOption;
    for (let i = 0; i < product.markets.length; i++) {
        let option = document.createElement('option');
        option.value = product.markets[i].price;
        option.innerHTML = product.markets[i].name;
        productSelect.appendChild(option);
    }

    selectedOption = option;

    for (let i = 0; i < Array.from(productSelect).length; i++) {
        if (Array.from(productSelect)[i].innerHTML === selectedOption.innerHTML) {
            Array.from(productSelect)[i].selected = "true";
        }
    }

    // Creating product-card-text paragraph
    let productCardText = document.createElement("p");
    productCardText.className = "product-card-text";
    productCardText.innerText = "Price: ";

    // Creating product-pricel span
    let productPricel = document.createElement("span");
    productPricel.className = "price product-pricel";
    productPricel.innerText = selectedOption.value;

    // Creating product-unitl span
    let productUnitl = document.createElement("span");
    productUnitl.className = "unit product-unitl";
    productUnitl.innerText = product.unit;

    // Appending product-pricel and product-unitl to product-card-text
    productCardText.appendChild(productPricel);
    productCardText.appendChild(productUnitl);

    // Creating product-price div
    let productPrice = document.createElement("div");
    productPrice.className = "product-price";
    productPrice.innerText = "Total: "

    // Creating product-total span
    let productTotal = document.createElement("span");
    productTotal.className = "product-total";
    productTotal.innerText = amount * price;

    // Creating product-unit span
    let productUnit = document.createElement("span");
    productUnit.className = "product-unit";
    productUnit.innerText = " din";

    // Appending product-total and product-unit to product-price
    productPrice.appendChild(productTotal);
    productPrice.appendChild(productUnit);

    // Creating product-amount div
    let productAmount = document.createElement("div");
    productAmount.className = "product-amount";

    // Creating product-amount-span span
    let productAmountSpan = document.createElement("span");
    productAmountSpan.className = "product-amount-span";
    productAmountSpan.innerText = "Amount:";

    // Creating input-amount input
    let inputAmount = document.createElement("input");
    inputAmount.className = "input-amount";
    inputAmount.type = "number";

    if (product.unitInput != "kg") {
        inputAmount.min = "1";
        inputAmount.step = "1";
    } else {
        inputAmount.min = "0.01";
        inputAmount.step = "0.01";
    }
    inputAmount.value = amount;

    // Creating unitInput span
    let unitInput = document.createElement("span");
    unitInput.innerText = product.unitInput;

    // Appending product-amount-span, input-amount and unitInput to product-amount 
    productAmount.appendChild(productAmountSpan);
    productAmount.appendChild(inputAmount);
    productAmount.appendChild(unitInput);

    // Appending product-title, product-select, product-card-text, product-price to card-body
    cardBody.appendChild(productTitle);
    cardBody.appendChild(productSelect);
    cardBody.appendChild(productCardText);
    cardBody.appendChild(productPrice);
    cardBody.appendChild(productAmount);

    // Appending card-body to body-col
    bodyCol.appendChild(cardBody);

    // Creating bin-col div
    let binCol = document.createElement("div");
    binCol.className = "col-1 bin-col";

    // Creating product-delete icon
    let productDelete = document.createElement("i");
    productDelete.className = "bi bi-trash3 product-delete";

    // Appending product-delete to bin-col
    binCol.appendChild(productDelete);

    // Appending imgCol, bodyCol and binCol to cart-card-row
    cartCardRow.appendChild(imgCol);
    cartCardRow.appendChild(bodyCol);
    cartCardRow.appendChild(binCol);

    // Appending cart-card-row to cart-card
    cartCard.appendChild(cartCardRow);

    return cartCard;
}

//** Add buttons adding products to offcanvas **/
let addedProducts = [];
let allTotal = 0;
let cartOffcanvas = document.querySelector("#my-offcanvas-cart");
let totalSpan = document.querySelector('#total');
let addButtons = document.querySelectorAll('.amount-button');
let counter = document.querySelector('.counter');
let badge = document.querySelector('.badge');
addButtons.forEach(button => { button.addEventListener('click', addButtonsClick) });

function addButtonsClick() {
    let product;
    let amountInput = this.previousElementSibling;
    let amount = parseFloat(this.previousElementSibling.value);
    let amountWrapper = this.closest(".amount-wrapper");
    let cardBody = amountWrapper.closest(".card-body");
    let select = cardBody.querySelector('.form-select');
    let selectedOption;
    let price = parseInt(cardBody.querySelector('.card-text').firstElementChild.innerText);
    let inputMessage = cardBody.querySelector('.input-message');
    let cardTitle = cardBody.querySelector('.card-title').innerText;

    for (let i = 0; i < Array.from(select).length; i++) {
        if (Array.from(select)[i].selected == true) {
            selectedOption = Array.from(select)[i];
        }
    }

    // Opening offcanvas when product is added to cart
    function openOffcanvas() {
        let bsOffcanvas = new bootstrap.Offcanvas('#offcanvasRight');
        bsOffcanvas.show();
    }

    for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name === cardTitle) {
            product = allProducts[i];
        }
    }

    if (cartOffcanvas.children.length != 0) {
        if (addedProducts.includes(product.name) == false) {
            if (amount > 0) {
                if (amount >= amountInput.min) {
                    addedProducts.push(product.name);
                    let newcard = createOffcanvasCard(product, amount, price, selectedOption);
                    cartOffcanvas.insertBefore(newcard, cartOffcanvas.firstChild);
                    if (cartOffcanvas.children[0].id = product.name) {
                        cartOffcanvas.children[0].style.border = "3px solid rgb(248, 47, 47)";
                        setTimeout(() => { cartOffcanvas.children[0].style.border = "1px solid white"; }, 1000);
                    }
                    openOffcanvas();
                    inputMessage.innerHTML = "";
                } else if (amount <= amountInput.min) {
                    inputMessage.innerText = "Incorect ampunt!";
                    setTimeout(() => { inputMessage.innerText = ""; }, 2000);
                }
            } else {
                inputMessage.innerHTML = "Add quantity!";
                setTimeout(() => { inputMessage.innerText = ""; }, 2000);
            }
        } else {
            if (amount <= 0) {
                inputMessage.innerHTML = "Product is already added!";
                setTimeout(() => { inputMessage.innerText = ""; }, 2000);
            } else {
                inputMessage.innerHTML = "Product is already added!";
                setTimeout(() => { inputMessage.innerText = ""; }, 2000);
            }
        }
    } else if (cartOffcanvas.children.length === 0) {
        if (amount > 0) {
            if (amount >= amountInput.min) {
                addedProducts.push(product.name);
                let newcard = createOffcanvasCard(product, amount, price, selectedOption);
                cartOffcanvas.appendChild(newcard);
                if (cartOffcanvas.children[0].id = product.name) {
                    cartOffcanvas.children[0].style.border = "3px solid rgb(248, 47, 47)";
                    setTimeout(() => { cartOffcanvas.children[0].style.border = "1px solid white"; }, 1000);
                }
                openOffcanvas();
                inputMessage.innerText = "";
            } else if (amount <= amountInput.min) {
                inputMessage.innerText = "Incorect ampunt!";
                setTimeout(() => { inputMessage.innerText = ""; }, 2000);
            }
        } else {
            inputMessage.innerText = "Add quantity!";
            setTimeout(() => { inputMessage.innerText = ""; }, 2000);
        }
    }

    // Updating badge and counter and displaying badge
    function counterUpdate() {
        if (cartOffcanvas.children.length > 0) {
            badge.style.display = "block";
            badge.innerText = cartOffcanvas.children.length;
        } else {
            badge.style.display = "none";
        }

        counter.innerText = cartOffcanvas.children.length;
    }

    counterUpdate();

    // Function changing total price
    function changeTotal() {
        let allCartCards = document.querySelectorAll('.cart-card');
        let totalItems = document.querySelector('.total-items');
        let totalArrray = [];
        allCartCards.forEach(card => { totalArrray.push(parseFloat(card.querySelector('.product-total').innerHTML)) })
        var sum = 0;
        for (var i = 0; i < totalArrray.length; i++) {
            sum += totalArrray[i]
        }
        allTotal = parseFloat(sum).toFixed(1);
        totalSpan.innerText = allTotal;
        totalItems.innerText = allTotal;
    }

    changeTotal();

    // Changing total price of a product when changing input value
    let offcanvasInputs = document.querySelectorAll('.input-amount')
    offcanvasInputs.forEach(input => { input.addEventListener('input', inputChange) });

    function inputChange() {
        let total = this.closest(".product-amount").previousElementSibling.firstElementChild;
        let price = parseInt(this.closest(".product-amount").previousElementSibling.previousElementSibling.firstElementChild.innerText);
        totalText = (this.value * price).toFixed(1);
        total.innerText = totalText;
        changeTotal();
    }

    // Offcanvas changing price based on selected market
    let selects = document.querySelectorAll('.product-select');
    selects.forEach(select => { select.addEventListener("change", handleSelectChange) });

    function handleSelectChange(event) {
        let currentValue = event.target.value;
        this.nextElementSibling.firstElementChild.innerText = currentValue;
        let value = parseInt(this.nextElementSibling.firstElementChild.innerText);
        let total = this.nextElementSibling.nextElementSibling.firstElementChild;
        let totalValue = this.nextElementSibling.nextElementSibling.firstElementChild;
        let amount = total.parentElement.nextElementSibling.querySelector('.input-amount').value;
        let totalValueText = amount * value;
        totalValue.innerText = totalValueText;
        changeTotal();
    }

    // Removing card when delete button is clicked
    let removeButtons = document.querySelectorAll('.product-delete');
    removeButtons.forEach(button => { button.addEventListener('click', removeCartItem) })

    function removeCartItem() {
        let card = this.parentElement.parentElement.parentElement;
        let name = card.id;
        let finalCards = document.querySelector('.items-wrapper');
        for (let i = 0; i < addedProducts.length; i++) {
            if (addedProducts[i] === name) {
                addedProducts.pop(addedProducts[i]);
            }
        }

        for (let i = 0; i < finalCards.children.length; i++) {
            if (finalCards.children[i].id === name) {
                finalCards.children[i].remove();
            }
        }
        
        card.remove();
        changeTotal();
        counterUpdate(); 
        if(cartOffcanvas.children.length === 0){
            purchaseButton.style.display = "none";
        }
    }
    if(cartOffcanvas.children.length > 0){
        purchaseButton.style.display = "block";
    } 
}

//** Card span responsive class changing **//
let cardSpanWidth = window.matchMedia('(max-width: 395px)');
cardSpanWidth.addEventListener('change', cardSpanMedia);

function cardSpanMedia(event) {
    if (event.matches) {
        document.querySelectorAll('.input-message').forEach(message => { message.style.height = "43px" });
    } else {
        document.querySelectorAll('.input-message').forEach(message => { message.style.height = "24px" });
    }
}

if(cardSpanWidth.matches){
    document.querySelectorAll('.input-message').forEach(message => { message.style.height = "43px" });
} else {
    document.querySelectorAll('.input-message').forEach(message => { message.style.height = "24px" });
}

//** App section changing price based on selected market **/
let selects = document.querySelectorAll('.form-select');
selects.forEach(select => { select.addEventListener("change", handleSelectChange) });

function handleSelectChange(event) {
    let currentValue = event.target.value;
    this.nextElementSibling.firstElementChild.innerText = currentValue;
}

//** Creating final purchase card function **//
function createFinalCard(product, price){
    // Creating item div
    let item = document.createElement("div");
    item.className = "item";
    item.id = product.name;

    // Creating final image
    let finalImg = document.createElement("img");
    finalImg.className = "w-img";
    finalImg.src = product.imgUrl;
    finalImg.alt = product.name;

    // Creating first span
    let firstSpan = document.createElement("span");
    firstSpan.className = "first";

    // Creating first txt
    let firstTxt = document.createElement("span");
    firstTxt.className = "first-txt";
    firstTxt.innerText = product.name;

    // Appending first txt to first span
    firstSpan.appendChild(firstTxt);

    // Creating second span
    let secondSpan = document.createElement("span");
    secondSpan.className = "second";

    // Creating final price
    let finalPrice = document.createElement("span");
    finalPrice.className = "final-price";
    finalPrice.innerText = price;

    // Creating final unit
    let finalUnit = document.createElement("span");
    finalUnit.className = "final-unit";
    finalUnit.innerText = " din"

    // Creating final delete
    let finalDelete = document.createElement("span");
    finalDelete.className = "final-delete";

    // Appending final price, final unit and final delete to second span
    secondSpan.appendChild(finalPrice);
    secondSpan.appendChild(finalUnit);
    secondSpan.appendChild(finalDelete);

    // Creating delete icon
    let deleteIcon = document.createElement("i");
    deleteIcon.className = "bi bi-trash3 final-del";

    // Appending delete icon to final delete
    finalDelete.appendChild(deleteIcon);
    
    // Appending final img, first span and second span to item
    item.appendChild(finalImg);
    item.appendChild(firstSpan);
    item.appendChild(secondSpan);

    return item;
}

//** Purchase button toggle and adding final cards to final section **//
let purchaseButton = document.querySelector('.buy-btn');
purchaseButton.addEventListener('click', purchaseButtonToggle);
let itemsWrapper = document.querySelector('.items-wrapper');

function purchaseButtonToggle(){
    let finalSection = document.querySelector('.final-section');
    let productsInfo = [];
    let names = [];
    let totalOffcanvas = document.querySelector('#total').innerHTML;
    let totalItems = document.querySelector('.total-items');
    let taxTotal = document.querySelector('.tax-total');
    let shippingTotal = document.querySelector('.ship-total');
    let pTotal = document.querySelector('.p-total');
    let cartButton = document.querySelector('#cart-button');

    if(cartOffcanvas.children.length > 0){
        buySection.style.display = "none";
        categoriesSection.style.display = "none";
        cartButton.style.display = "none";
        finalSection.style.display = "block";
    }

    while (itemsWrapper.firstChild) {
        itemsWrapper.removeChild(itemsWrapper.firstChild);
    }

    for(let i = 0; i < Array.from(cartOffcanvas.children).length; i++){
        let price = parseFloat(Array.from(cartOffcanvas.children)[i].querySelector('.product-total').innerText);
        price = parseFloat(price).toFixed(1);
        let id = Array.from(cartOffcanvas.children)[i].id;
        for(let i = 0; i < allProducts.length; i++){
            if(allProducts[i].name === id){
                productsInfo.push([allProducts[i],price]);
                names.push(allProducts[i].name);
            }
        }
    }
    
    for(let i = 0; i < productsInfo.length; i++){
        itemsWrapper.appendChild(createFinalCard(productsInfo[i][0],productsInfo[i][1]));
    }

    if(totalOffcanvas < 2000){
        shippingTotal.innerHTML = "500.0";
    } else {
        shippingTotal.innerHTML = "0.0";
    }
    taxTotal.innerText = (parseFloat(totalOffcanvas).toFixed(1) * 0.2).toFixed(1);
    pTotal.innerText = parseFloat(totalOffcanvas).toFixed(1);
    totalItems.innerHTML = (parseFloat(totalOffcanvas) + parseFloat(shippingTotal.innerHTML));

    // Final section delete buttons removing final card from final section
    let finalDeleteButtons = document.querySelectorAll('.final-del');
    finalDeleteButtons.forEach(button =>{button.addEventListener('click', finalDeleteButtonsToggle)});

    function finalDeleteButtonsToggle(){
        let finalCard = this.parentElement.parentElement.parentElement;

        // Function changing total price
        function changeTotal() {
            let totalArrray = [];
            let total;
            Array.from(itemsWrapper.children).forEach(card => { totalArrray.push(parseFloat(card.querySelector('.final-price').innerHTML)) })
            var sum = 0;
            for (var i = 0; i < totalArrray.length; i++) {
                sum += totalArrray[i]
            }

            total = parseFloat(sum).toFixed(1);
            taxTotal.innerText = (total * 0.2).toFixed(1);

            if(total > 2000){
                shippingTotal.innerHTML = "0";
            } else if (total < 2000 && total > 0.01){
                shippingTotal.innerHTML = "500";
            } else if(total < 0.01){
                shippingTotal.innerHTML = "0";
            }

            pTotal.innerText = total;
            totalItems.innerText = parseFloat(total + parseFloat(shippingTotal.innerHTML)).toFixed(1);

        }

        for(let i = 0; i < itemsWrapper.children.length; i++){
            if(finalCard.id === itemsWrapper.children[i].id){  
                itemsWrapper.children[i].remove();
                finalCard.remove();
                changeTotal();
            }    
        }
    }
}

//** Back to products button toggle **//
let backButton = document.querySelector('.back-btn');
backButton.addEventListener('click', backButtonToggle);

function backButtonToggle(){
    let finalSection = document.querySelector('.final-section');
    let cartButton = document.querySelector('#cart-button');
    buySection.style.display = "block";
    cartButton.style.display = "block";
    categoriesSection.style.display = "none";
    finalSection.style.display = "none";
}

//** Final purchase Form validation and errors **/
function validateForm3(form){
    let inputs = document.querySelectorAll('.control-3');
    let price = document.querySelector('.total-items');
    inputs.forEach(input => {
        input_error = input.nextElementSibling;
        if (input.value.trim() == "") {
            input_error.innerText = "Blank field!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else if (input.id === "final-telephone" && isNaN(input.value)) {
            input_error.innerText = "Please enter valid telephone number!";
            input.style.borderColor = "red";
            input.style.backgroundColor = "rgb(232, 191, 191)";
            input.classList.add('shake');
        } else {
            input_error.innerText = "";
            input.style.borderColor = "black";
            input.style.backgroundColor = "#fff";
        }
    });

    let retVal = true;

    if (price.innerText = "0.00") {

        retVal = false;
    }

    let nameSurname = form.name.value.trim();
    if (nameSurname == "") {

        retVal = false;
    }

    let address = form.address.value.trim();
    if (address == "") {

        retVal = false;
    }

    let telephone = form.telephone.value.trim();
    if (telephone == "" || isNaN(telephone)) {

        retVal = false;
    }

    return retVal;
}

//** Final purchase form toggle input errors appearance **/
let inputs3 = document.querySelectorAll('.control-3');
inputs3.forEach(input => { input.addEventListener('input', toogleInputs3) });

function toogleInputs3() {
    let error = this.nextElementSibling;
    if (this.value.trim() != "") {
        error.innerText = "";
        this.style.borderColor = "black";
        this.style.backgroundColor = "#fff";
    }
    if (this.id == "final-telephone" && isNaN(this.value)) {
        error.innerText = "Please enter valid telephone number!";
        this.style.borderColor = "red";
        this.style.backgroundColor = "rgb(232, 191, 191)";
    } else if (this.value.trim() == "") {
        error.innerText = "Black field!";
        this.style.borderColor = "red";
        this.style.backgroundColor = "rgb(232, 191, 191)";
    }
}

    




























