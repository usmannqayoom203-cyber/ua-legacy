
let selectedSize = null;
let quantity = 1;

let cart = JSON.parse(
    localStorage.getItem("ua_legacy_cart")
) || [];


// ==========================
// SIZE SELECTION
// ==========================

function selectSize(size) {

    selectedSize = size;

    const buttons = document.querySelectorAll(".sizes button");

    buttons.forEach(button => {

        button.style.background = "white";
        button.style.color = "#111";

    });

    buttons.forEach(button => {

        if (button.innerText === size) {

            button.style.background = "#111";
            button.style.color = "white";

        }

    });

}


// ==========================
// QUANTITY
// ==========================

function changeQuantity(change) {

    quantity = quantity + change;

    if (quantity < 1) {
        quantity = 1;
    }

    if (quantity > 10) {
        quantity = 10;
    }

    const quantityElement =
        document.getElementById("quantity");

    if (quantityElement) {
        quantityElement.innerText = quantity;
    }

}


// ==========================
// ADD TO CART
// ==========================

function addProductToCart() {

    if (!selectedSize) {

        alert("Please select a size first.");

        return;

    }


    const product = {

        name: "LEGECY OVERSIZED BLACK",

        price: 799,

        size: selectedSize,

        quantity: quantity

    };


    cart.push(product);


    localStorage.setItem(
        "ua_legacy_cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        product.name +
        " added to cart!\n\n" +
        "Size: " +
        product.size +
        "\nQuantity: " +
        product.quantity
    );

}


// ==========================
// CART COUNT
// ==========================

function updateCartCount() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    const cartButtons =
        document.querySelectorAll(
            ".nav-buttons button"
        );


    cartButtons.forEach(button => {

        if (
            button.innerText
            .toLowerCase()
            .includes("cart")
        ) {

            button.innerText =
                "Cart (" +
                totalItems +
                ")";

        }

    });

}


// ==========================
// BUY NOW
// ==========================

function buyNow() {

    if (!selectedSize) {

        alert("Please select a size first.");

        return;

    }


    alert(
        "Great!\n\n" +
        "Product: LEGECY OVERSIZED BLACK\n" +
        "Size: " + selectedSize +
        "\nQuantity: " + quantity +
        "\n\nCheckout will be connected next."
    );

}


// ==========================
// LOAD CART
// ==========================

updateCartCount();


// ==========================
// DISPLAY CART
// ==========================

function displayCart() {

    const cartContainer =
        document.getElementById("cart-items");

    if (!cartContainer) {
        return;
    }


    let cart =
        JSON.parse(
            localStorage.getItem("ua_legacy_cart")
        ) || [];


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty.
                </h2>

                <p>
                    Discover something from
                    the latest UA LEGECY collection.
                </p>

            </div>

        `;

        document.getElementById(
            "cart-total"
        ).innerText = "₹0";

        return;

    }


    let total = 0;


    cartContainer.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const itemHTML = `

            <div class="cart-item">

                <div class="cart-image">
                    UA
                </div>


                <div class="cart-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Size: ${item.size}
                    </p>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                    <p class="cart-price">
                        ₹${itemTotal}
                    </p>

                </div>


                <button
                    class="remove-item"
                    onclick="removeCartItem(${index})">

                    Remove

                </button>

            </div>

        `;


        cartContainer.innerHTML += itemHTML;

    });


    document.getElementById(
        "cart-total"
    ).innerText = "₹" + total;

}


// ==========================
// REMOVE ITEM
// ==========================

function removeCartItem(index) {

    let cart =
        JSON.parse(
            localStorage.getItem("ua_legacy_cart")
        ) || [];


    cart.splice(index, 1);


    localStorage.setItem(
        "ua_legacy_cart",
        JSON.stringify(cart)
    );


    displayCart();

}


// ==========================
// CHECKOUT
// ==========================

function goToCheckout() {

    let cart =
        JSON.parse(
            localStorage.getItem("ua_legacy_cart")
        ) || [];


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


// ==========================
// RUN CART
// ==========================

displayCart();



// ==========================
// DISPLAY CHECKOUT
// ==========================

function displayCheckout() {

    const container =
        document.getElementById("checkout-items");

    if (!container) {
        return;
    }


    let cart =
        JSON.parse(
            localStorage.getItem("ua_legacy_cart")
        ) || [];


    let total = 0;

    container.innerHTML = "";


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        container.innerHTML += `

            <div class="checkout-item">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Size: ${item.size}
                </p>

                <p>
                    Quantity: ${item.quantity}
                </p>

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>

        `;

    });


    document.getElementById(
        "checkout-total"
    ).innerText = "₹" + total;

}


// ==========================
// PLACE ORDER
// ==========================

function placeOrder() {

    const name =
        document.getElementById(
            "customer-name"
        ).value.trim();

    const email =
        document.getElementById(
            "customer-email"
        ).value.trim();

    const phone =
        document.getElementById(
            "customer-phone"
        ).value.trim();

    const address =
        document.getElementById(
            "customer-address"
        ).value.trim();

    const city =
        document.getElementById(
            "customer-city"
        ).value.trim();

    const pin =
        document.getElementById(
            "customer-pin"
        ).value.trim();


    if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !pin
    ) {

        alert(
            "Please complete all delivery details."
        );

        return;

    }


    const cart =
        JSON.parse(
            localStorage.getItem("ua_legacy_cart")
        ) || [];


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    alert(
        "Order placed successfully!\n\n" +
        "Thank you, " +
        name +
        "!\n\n" +
        "This is a demo checkout. " +
        "Real payment processing will be connected later."
    );


    // Clear cart after demo order

    localStorage.removeItem(
        "ua_legacy_cart"
    );


    window.location.href =
        "index.html";

}


displayCheckout();

