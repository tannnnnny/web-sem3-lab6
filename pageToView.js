const apiUrl = "https://lab6be-gefra9ffayftegh2.canadacentral-01.azurewebsites.net/dropdown"; // Replace with your API base URL
//const apiUrl = "https://localhost:7140/dropdown"; // Replace with your API base URL

// Function to fetch and display dropdowns
async function fetchDropdowns() {
  try {
    const response = await fetch(apiUrl);
    const dropdowns = await response.json();
    const tableBody = document.querySelector("#dropdownsTable tbody");

    tableBody.innerHTML = ""; // Clear the table

    dropdowns.forEach((dropdown) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${dropdown.id}</td>
        <td>${dropdown.name}</td>
        <td>${dropdown.items.join(", ")}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching dropdowns:", error);
  }
}

// Initial fetch
fetchDropdowns();

// Refetch every 5 seconds
setInterval(fetchDropdowns, 5000);
