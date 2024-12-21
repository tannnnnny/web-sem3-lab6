const apiUrl = "https://lab6be-gefra9ffayftegh2.canadacentral-01.azurewebsites.net/dropdown"; // Replace with your API base URL
//const apiUrl = "https://localhost:7140/dropdown"; // Replace with your API base URL
// Fetch and display all dropdowns
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
        <td>
          <button onclick="deleteDropdown(${dropdown.id})">Delete</button>
          <button onclick="editDropdown(${dropdown.id}, '${dropdown.name}', '${dropdown.items.join(", ")}')">Edit</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching dropdowns:", error);
  }
}

// Add a new dropdown
document.getElementById("addDropdownForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("dropdownName").value;
  const items = document.getElementById("dropdownItems").value.split(",").map((item) => item.trim());

  try {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, items }),
    });
    fetchDropdowns();
  } catch (error) {
    console.error("Error adding dropdown:", error);
  }
});

// Delete a dropdown
async function deleteDropdown(id) {
  try {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchDropdowns();
  } catch (error) {
    console.error("Error deleting dropdown:", error);
  }
}

// Edit a dropdown
function editDropdown(id, currentName, currentItems) {
  const newName = prompt("Edit Dropdown Name:", currentName);
  const newItems = prompt("Edit Items (comma-separated):", currentItems);

  if (newName && newItems) {
    updateDropdown(id, newName, newItems.split(",").map((item) => item.trim()));
  }
}

async function updateDropdown(id, name, items) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, items }),
    });
    fetchDropdowns();
  } catch (error) {
    console.error("Error updating dropdown:", error);
  }
}

// Initial fetch
fetchDropdowns();
