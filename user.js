
var users = [];

try {
  var saved = localStorage.getItem("users");
  if (saved) {
    users = JSON.parse(saved);
  }
} catch (e) {
  console.error("خطا در خواندن داده‌ها:", e);
}

function saveUser(username, phone) {
  users.push({ username: username, phone: phone });
  localStorage.setItem("users", JSON.stringify(users));
}

function showUsers() {
  var tableBody = document.getElementById("userList");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  for (var i = 0; i < users.length; i++) {
    var row = document.createElement("tr");

    var tdName = document.createElement("td");
    tdName.textContent = users[i].username;
    row.appendChild(tdName);

    var tdPhone = document.createElement("td");
    tdPhone.textContent = users[i].phone;
    row.appendChild(tdPhone);

    tableBody.appendChild(row);
  }
}

window.onload = showUsers;