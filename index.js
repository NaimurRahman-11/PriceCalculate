function addRow() {
    const formRow = document.querySelector(".form-row");
    const clone = formRow.cloneNode(true);

    // Clear input values in the cloned row
    clone.querySelectorAll("input").forEach(input => input.value = "");

    // Insert the cloned row below the "Add Another" button
    const addButton = document.getElementById("addButton");
    formRow.parentElement.insertBefore(clone, addButton);

    // Attach event listeners to the cloned row's input fields
    initializeListeners();

    // Reattach event listener to the "Paid" input field
    clone.querySelector(".price-input").addEventListener("input", updateTotalPrice);
    clone.querySelector(".quantity-input").addEventListener("input", updateTotalPrice);
    clone.querySelector(".paid-input").addEventListener("input", updateDueAmount);
}


function updateDueAmount() {
    const totalPrice = parseFloat(document.getElementById("totalPrice").value) || 0;
    const paidAmount = parseFloat(document.getElementById("paid").value) || 0;

    const dueAmount = totalPrice - paidAmount;

    const dueInput = document.getElementById("due");
    dueInput.value = dueAmount.toFixed(2);
}

// Attach event listener to the "Paid" input field
const paidInput = document.getElementById("paid");
paidInput.addEventListener("input", updateDueAmount);



function updateTotalPrice() {
    const formRows = document.querySelectorAll(".form-row");
    let totalPrice = 0;

    formRows.forEach(row => {
        const quantity = parseFloat(row.querySelector(".quantity-input").value);
        const price = parseFloat(row.querySelector(".price-input").value);
        totalPrice += quantity * price;
    });

    // Update the "Total Price" input field
    const totalPriceInput = document.getElementById("totalPrice");
    totalPriceInput.value = totalPrice.toFixed(2); // Display total with 2 decimal places
}

function initializeListeners() {
    const quantityInputs = document.querySelectorAll(".quantity-input");
    const priceInputs = document.querySelectorAll(".price-input");
    
    quantityInputs.forEach(input => input.addEventListener("input", updateTotalPrice));
    priceInputs.forEach(input => input.addEventListener("input", updateTotalPrice));
}

// Call initializeListeners() once to attach listeners to initial input fields
initializeListeners();
