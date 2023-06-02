let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};
closeCart.onclick = () =>{
    cart.classList.remove("active");
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName('product-title')[0].innerText;
    var price = shopProduct.getElementsByClassName('price')[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;

    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartItems = cartContent.getElementsByClassName("cart-box");
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var itemTitle = cartItem.getElementsByClassName("cart-product-title")[0].innerText;
        if (itemTitle === title) {
            alert('You have already added this item to cart');
            return;
        }
    }

    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
           
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartContent.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
}

function buyButtonClicked() {
    alert('Your order is placed');
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");

    // Remove pictures from the left side
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var cartProductTitle = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
        var productBoxes = document.getElementsByClassName("product-box");

        for (var j = 0; j < productBoxes.length; j++) {
            var productBox = productBoxes[j];
            var productTitle = productBox.getElementsByClassName("product-title")[0].innerText;

            if (cartProductTitle === productTitle) {
                productBox.style.display = "none";
                break;
            }
        }
    }

    // Clear the cart and update the total price
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}


function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        // var quantity = quantityElement.value;
        total += price;
    }
    total = Math.round(total * 100) / 100;
document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}
