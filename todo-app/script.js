document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    fetch("fetch.php")
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("taskList");
        list.innerHTML = "";

        data.forEach(task => {
            const daysLeft = calculateDaysLeft(task.due_date);

            const row = document.createElement("tr");

            // Reset colors
            row.style.backgroundColor = "";
            row.style.color = "black";

            // Apply traffic-light coloring based on days left
            if (typeof daysLeft === "number") {
                if (daysLeft > 5) {
                    row.style.backgroundColor = "#ccffcc"; // light green
                    row.style.color = "#006600"; // dark green
                } else if (daysLeft >= 3 && daysLeft <= 5) {
                    row.style.backgroundColor = "#ffe5b3"; // light orange
                    row.style.color = "#994d00"; // dark orange
                } else if (daysLeft <= 2) {
                    row.style.backgroundColor = "#ffcccc"; // light red
                    row.style.color = "#800000"; // dark red
                }
            } else {
                // Expired, Due Today, or N/A
                if (daysLeft === "Expired" || daysLeft === "Due Today!") {
                    row.style.backgroundColor = "#ffcccc";
                    row.style.color = "#800000";
                }
            }

            row.innerHTML = `
                <td><input type="checkbox" onchange="markDone(this)"></td>
                <td class="task-text">${task.task}</td>
                <td>${typeof daysLeft === "number" ? daysLeft + " day(s) left" : daysLeft}</td>
                <td>
                    <button onclick="editTask(${task.id}, this)">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </td>
            `;

            list.appendChild(row);
        });
    });
}

function addTask() {
    const task = document.getElementById("taskInput").value.trim();
    const startDate = document.getElementById("startDate").value;
    const dueDate = document.getElementById("dueDate").value;

    if (task === "") return;

    fetch("add.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "task=" + encodeURIComponent(task) +
              "&start_date=" + startDate +
              "&due_date=" + dueDate
    }).then(() => {
        document.getElementById("taskInput").value = "";
        document.getElementById("startDate").value = "";
        document.getElementById("dueDate").value = "";
        loadTasks();
    });
}

function deleteTask(id) {
    fetch("delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "id=" + id
    }).then(() => loadTasks());
}

function editTask(id) {
    const newTask = prompt("Edit task:");
    if (newTask) {
        fetch("update.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "id=" + id + "&task=" + encodeURIComponent(newTask)
        }).then(() => loadTasks());
    }
}

function calculateDaysLeft(end) {
    if (!end) return "N/A";

    const today = new Date();
    const due = new Date(end);

    if (isNaN(due.getTime())) return "Invalid date";

    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Due Today!";
    return diffDays; 
}

function markDone(checkbox) {
    const row = checkbox.closest("tr");
    row.classList.toggle("done");
}