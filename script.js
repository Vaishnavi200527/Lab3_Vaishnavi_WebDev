const addItemForm = document.getElementById("add-item-form");
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");
const itemQuantityInput = document.getElementById("item-quantity");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

let cart = [];

function addItem(event) {
    event.preventDefault();

    const itemName = itemNameInput.value.trim();
    const itemPrice = parseFloat(itemPriceInput.value);
    const itemQuantity = parseInt(itemQuantityInput.value);

    if (itemName && !isNaN(itemPrice) && itemPrice > 0 && !isNaN(itemQuantity) && itemQuantity > 0) {
        const newItem = {
            id: Date.now(),
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
        };

        cart.push(newItem);
        renderCart();

        itemNameInput.value = "";
        itemPriceInput.value = "";
        itemQuantityInput.value = "";
    } else {
        alert("Please enter a valid item name, price, and quantity.");
    }
}

function editItem(itemId) {
    const item = cart.find((item) => item.id === itemId);
    if (item) {
        const newName = prompt("Edit item name:", item.name);
        const newPrice = parseFloat(prompt("Edit item price:", item.price));
        const newQuantity = parseInt(prompt("Edit item quantity:", item.quantity));

        if (newName && !isNaN(newPrice) && newPrice > 0 && !isNaN(newQuantity) && newQuantity > 0) {
            item.name = newName;
            item.price = newPrice;
            item.quantity = newQuantity;
            renderCart();
        } else {
            alert("Please enter a valid item name, price, and quantity.");
        }
    }
}

function deleteItem(itemId) {
    cart = cart.filter((item) => item.id !== itemId);
    renderCart();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function renderCart() {
    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";

        itemElement.innerHTML = `
            <span>${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}</span>
            <div>
                <button onclick="editItem(${item.id})">Edit</button>
                <button onclick="deleteItem(${item.id})">Delete</button>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
    });

    totalPriceElement.textContent = calculateTotal().toFixed(2);
}

addItemForm.addEventListener("submit", addItem);