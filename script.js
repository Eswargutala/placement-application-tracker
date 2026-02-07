let applications = JSON.parse(localStorage.getItem("applications")) || [];

function addApplication() {
  const company = document.getElementById("company").value.trim();
  const role = document.getElementById("role").value.trim();
  const status = document.getElementById("status").value;

  if (company === "" || role === "") {
    alert("Please fill all fields");
    return;
  }

  applications.push({ company, role, status });
  localStorage.setItem("applications", JSON.stringify(applications));

  document.getElementById("company").value = "";
  document.getElementById("role").value = "";

  displayApplications(applications);
}

function displayApplications(list) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  list.forEach((app, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${app.company}</td>
        <td>${app.role}</td>
        <td class="${app.status}">${app.status}</td>
        <td>
          <select onchange="updateStatus(${index}, this.value)">
            <option ${app.status === "Applied" ? "selected" : ""}>Applied</option>
            <option ${app.status === "Interview" ? "selected" : ""}>Interview</option>
            <option ${app.status === "Selected" ? "selected" : ""}>Selected</option>
            <option ${app.status === "Rejected" ? "selected" : ""}>Rejected</option>
          </select>
          <button onclick="deleteApp(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteApp(index) {
  applications.splice(index, 1);
  localStorage.setItem("applications", JSON.stringify(applications));
  displayApplications(applications);
}

function updateStatus(index, newStatus) {
  applications[index].status = newStatus;
  localStorage.setItem("applications", JSON.stringify(applications));
  displayApplications(applications);
}

function filterStatus(status) {
  if (status === "All") {
    displayApplications(applications);
  } else {
    const filtered = applications.filter((app) => app.status === status);
    displayApplications(filtered);
  }
}

displayApplications(applications);
