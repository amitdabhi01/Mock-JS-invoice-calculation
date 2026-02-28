let items = [];

function addItem() {
  const name = document.getElementById("itemName").value.trim();
  const quantity = parseFloat(document.getElementById("quantity").value);
  const price = parseFloat(document.getElementById("price").value);
  const discountPercent =
    parseFloat(document.getElementById("discount").value) || 0;

  if (!name || quantity <= 0 || price <= 0) {
    alert("Please enter valid item details.");
    return;
  }

  if (discountPercent < 0 || discountPercent > 100) {
    alert("Discount must be between 0 and 100.");
    return;
  }

  const total = quantity * price;
  const discountAmount = total * (discountPercent / 100);
  const finalTotal = total - discountAmount;

  items.push({
    name,
    quantity,
    price,
    discountPercent,
    discountAmount,
    finalTotal,
  });

  renderTable();
  updateTotals();
  clearInputs();
}

function renderTable() {
  const tbody = document.getElementById("invoiceBody");
  tbody.innerHTML = "";

  items.forEach((item, index) => {
    tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.discountPercent}%</td>
                <td>$${item.finalTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteItem(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
  });
}

function deleteItem(index) {
  items.splice(index, 1);
  renderTable();
  updateTotals();
}

function clearInputs() {
  document.getElementById("itemName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
  document.getElementById("discount").value = "";
}

function resetInvoice() {
  items = [];
  renderTable();
  updateTotals();
  clearInputs();
}
