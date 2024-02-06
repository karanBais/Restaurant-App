function addOrder() {
    const price = document.getElementById('price').value;
    const dishName = document.getElementById('dishName').value;
    const tableNumber = document.getElementById('tableNumber').value;

    const newOrder = {
        price: price,
        dishName: dishName,
        tableNumber: tableNumber
    };

    axios.post("https://crudcrud.com/api/de15d999e54a44ed8bf0672a40f2f70c/orders", newOrder)
        .then((response) => {
            console.log("Order added:", response.data);
            fetchOrders();
        })
        .catch(error => console.error(error));

    document.getElementById('orderForm').reset();
}

function deleteOrder(id) {
    axios.delete("https://crudcrud.com/api/de15d999e54a44ed8bf0672a40f2f70c/orders/" + id)
        .then((response) => {
            console.log("Order deleted:", id);
            fetchOrders();
        })
        .catch(error => console.error(error));
}

function fetchOrders() {
    axios.get("https://crudcrud.com/api/de15d999e54a44ed8bf0672a40f2f70c/orders")
        .then((response) => {
            const ordersTable = document.getElementById("ordersTable");
            ordersTable.innerHTML = `
                <tr>
                    <th>Table Number</th>
                    <th>Dish Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            `;
            response.data.forEach(order => {
                const row = ordersTable.insertRow(-1);
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                cell1.textContent = "Table " + order.tableNumber;
                cell2.textContent = order.dishName;
                cell3.textContent = order.price;
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function() {
                    deleteOrder(order._id);
                });
                cell4.appendChild(deleteButton);
            });
        })
        .catch(error => console.error(error));
}

window.addEventListener('DOMContentLoaded', fetchOrders);