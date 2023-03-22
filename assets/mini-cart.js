/**
 * 1. Show/Hide Mini Cart
 * 2. Get all products in the basket and display them in the mini cart
 * 3. Update the quantities of items in the mini cart
 * 4. Remove items from the mini cart
 */

/**
 * Sends a GET request to the '/{locale}/cart.js' route of the Shopify Ajax
 * API, returns the response as JSON and then passes the data to the 
 * renderCart function, which outputs the content.
 */
fetch(window.Shopify.routes.root + 'cart.js')
    .then(response => response.json())
    .then(data => {
        // Loop through items and attach them to the DOM
        renderCart(data);
    })
    .catch(err => console.log(err));

/**
 * Get reference to the mini-cart, mini-cart__trigger and overlay DOM 
 * elements.
 */
const miniCart = document.querySelector('.mini-cart');
const miniCartTrigger = document.querySelector('.mini-cart__trigger');
const overlay = document.querySelector('.overlay');

/**
 * When the user clicks the mini-cart__trigger element add classes to the
 * overlay and mini-cart elements to show them.
 */
miniCartTrigger.addEventListener('click', () => {
    overlay.classList.add('overlay--show');
    miniCart.classList.add('mini-cart--show');
});

/**
 * When the user clicks the overlay element remove classes from the mini-cart
 * and overlay to hide them again.
 */
overlay.addEventListener('click', () => {
    overlay.classList.remove('overlay--show');
    miniCart.classList.remove('mini-cart--show');
});

function renderCart(data) {
    // Get mini cart title element
    const miniCartTitle = document.querySelector('.mini-cart__title');
    // Get DOM element where the cart items will be attached
    const miniCartItems = document.querySelector('.mini-cart__items');
    // Output the cart title with total items
    miniCartTitle.innerText = `CART (${data.item_count})`;

    // Clear HTML in the mini cart items
    miniCartItems.innerHTML = '';

    if (data.items.length > 0) {
        data.items.forEach(item => {
            miniCartItems.innerHTML += `
                <div class="mini-cart__item">
                    <div class="item__details">
                        <img src="${item.featured_image.url}" alt="${item.featured_image.alt}">
                        <span>${item.product_title}</span>
                    </div>
                    <div class="item__actions">
                        <div class="quantity-input">
                            <button type="button" class="minus">-</button>
                            <input type="hidden" class="item__line-key" value="${item.key}">
                            <input type="text" class="item__quantity" min="1" value="${item.quantity}">
                            <button type="button" class="plus">+</button>
                        </div>
                        <button class="item__remove" data-line-key="${item.key}">X</button>
                    </div>
                </div>
            `;
        });
    } else {
        miniCartItems.innerHTML = '<p class="mini-cart__empty">Cart is empty</p>';
    }

    // Get the quantity input and attach events
    handleQuantityInputs();
    // Get the remove buttons and attach events
    handleRemoveItem();
}

/**
 * Attaches event listeners to the quantity input buttons, and
 * updates the value of the quantity input field.
 */
function handleQuantityInputs() {
    // Get a refernce to any quantity inputs
    const qtyInputEls = document.querySelectorAll('.mini-cart .quantity-input');

    // If there are any then loop through them and attach event listeners
    if (qtyInputEls.length > 0) {
        qtyInputEls.forEach(input => {
            // Get references to the plus and minus buttons
            let plusBtn = input.querySelector('.plus');
            let minusBtn = input.querySelector('.minus');
            // Get the quantity value
            let quantity = input.querySelector('.item__quantity').value;
            // Get the line item's key
            let lineKey = input.querySelector('.item__line-key').value;
            
            // Increase the quantity input value
            plusBtn.addEventListener('click', () => {
                // Increase the quantity value
                quantity++;
                // Calls the updateItemQuantity function which sends an Ajax request to update the items cart quantity
                updateItemQuantity(lineKey, quantity);
            });

            // Decrease the quantity input value, making sure it doesn't go below 1
            minusBtn.addEventListener('click', () => {
                // Decrease the quantity value
                quantity--;
                // Calls the updateItemQuantity function which sends an Ajax request to update the items cart quantity
                updateItemQuantity(lineKey, quantity);
            });
        });
    }
}

/**
 * Sends a request to the Ajax api, updating the selected items quantity
 * to 0, which will remove it from the cart.
 */
function handleRemoveItem(lineKey, value) {
    const removeItemButton = document.querySelectorAll('.item__remove');

    removeItemButton.forEach(button => {
        // Get the line item key from the buttons data attribute
        let lineKey = button.dataset.lineKey;

        button.addEventListener('click', () => {
            // Update the item quantity to 0 in the cart to remove it
            updateItemQuantity(lineKey, 0);
        });
    });
}

/**
 * Sends a request to the Ajax API to update the quantity of the line item.
 */
function updateItemQuantity(lineKey, value) {
    fetch(window.Shopify.routes.root + 'cart/change.js', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'id': lineKey,
            'quantity': parseInt(value)
        })
    })
    .then(response => response.json())
    .then(data => {
        renderCart(data);
    });
}

/**
 * Handle removing all cart items
 */
const removeAllButton = document.querySelector('.mini-cart__remove-all');
removeAllButton.addEventListener('click', () => {
    fetch(window.Shopify.routes.root + 'cart/clear.js', {
        method: 'post'
    })
    .then(response => response.json())
    .then(data => {
        renderCart(data);
    });
});