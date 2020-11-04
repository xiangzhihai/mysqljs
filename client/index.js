

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/getAll")
        .then(res => res.json())
        .then(data => loadHTMLTable(data['data']));
})

const addBtn = document.querySelector("#add-name-btn");

addBtn.onclick = () => {
    const nameInput = document.querySelector("#name-input");
    const name = nameInput.value;
    nameInput.value = "";
    fetch("http://localhost:5000/insert", {
        headers: {
            "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ name: name })
    }).then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
}

const insertRowIntoTable = ({ id, name, date_added }) => {
    const table = document.querySelector("table tbody");
    const isTableData = table.querySelector(".no-data");
    let tableHTML = "";
    tableHTML += "<tr>";
    tableHTML += `<td>${id}</td>`;
    tableHTML += `<td>${name}</td>`;
    tableHTML += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHTML += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
    tableHTML += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
    tableHTML += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHTML;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHTML;
    }

}

const loadHTMLTable = (data) => {
    const table = document.querySelector("table tbody");

    // console.log(data);
    if (!data.length) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
        return;
    }

    let tableHTML = "";
    data.forEach(({ id, name, date_added }) => {
        tableHTML += "<tr>";
        tableHTML += `<td>${id}</td>`;
        tableHTML += `<td>${name}</td>`;
        tableHTML += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHTML += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
        tableHTML += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
        tableHTML += "</tr>";
    })

    table.innerHTML = tableHTML;
}