document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/getAll")
    .then(res => res.json())
    .then(data => loadHTMLTable(data['data']));
})

const loadHTMLTable = (data) => {
    const table = document.querySelector("table tbody");
    let tableHTML = "";
    console.log(data);
    if (!data.length) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>"
    }
}