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
    let paidAmount = parseFloat(document.getElementById("paid").value) || 0;

    // Ensure paid amount doesn't exceed total price
    paidAmount = Math.min(paidAmount, totalPrice);

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
        const quantity = parseFloat(row.querySelector(".quantity-input").value) || 0;
        const price = parseFloat(row.querySelector(".price-input").value) || 0;
        totalPrice += Math.max(0, quantity) * Math.max(0, price); // Ensure positive values
    });

    // Update the "Total Price" input field
    const totalPriceInput = document.getElementById("totalPrice");
    totalPriceInput.value = totalPrice.toFixed(2); // Display total with 2 decimal places

    // Update due amount
    updateDueAmount();
}

function initializeListeners() {
    const quantityInputs = document.querySelectorAll(".quantity-input");
    const priceInputs = document.querySelectorAll(".price-input");
    
    quantityInputs.forEach(input => input.addEventListener("input", updateTotalPrice));
    priceInputs.forEach(input => input.addEventListener("input", updateTotalPrice));
}

// Call initializeListeners() once to attach listeners to initial input fields
initializeListeners();


// Attach event listener to the "Submit" button
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", displaySummary);

function displaySummary() {
    const productSelects = document.querySelectorAll(".product-select");
    const quantities = document.querySelectorAll(".quantity-input");
    const summaryDiv = document.getElementById("summaryAlert");
    
    let summaryContent = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <h4 class="alert-heading">Goods Summary</h4>
    `;

    for (let i = 0; i < productSelects.length; i++) {
        const selectedProduct = productSelects[i].value;
        const quantity = parseFloat(quantities[i].value) || 0;

        if (selectedProduct !== "Select Your Goods" && quantity > 0) {
            summaryContent += `
                <p><strong>Product:</strong> ${selectedProduct}</p>
                <p><strong>Quantity:</strong> ${quantity}</p>
                <hr>
            `;
        }
    }

    const totalPrice = parseFloat(document.getElementById("totalPrice").value) || 0;
    const paidAmount = parseFloat(document.getElementById("paid").value) || 0;
    const dueAmount = parseFloat(document.getElementById("due").value) || 0;
    const selectedDate = document.getElementById("date").value;

    summaryContent += `
            <p><strong>Total Price:</strong> BDT. ${totalPrice.toFixed(2)}</p>
            <p><strong>Paid Amount:</strong> BDT. ${paidAmount.toFixed(2)}</p>
            <p><strong>Due Amount:</strong> BDT. ${dueAmount.toFixed(2)}</p>
            <p><strong>Date:</strong> ${selectedDate}</p>
            <hr>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="alert" aria-label="Close">
                Close
            </button>
        </div>
    `;

    summaryDiv.innerHTML = summaryContent;

    // Show the summary alert
    summaryDiv.style.display = "block";
}



