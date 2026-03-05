<?php
include "config.php";

if(isset($_POST['task'])){
    $task = $_POST['task'];
    $start = $_POST['start_date']; // can be empty
    $due = $_POST['due_date'];     // can be empty

    $stmt = $conn->prepare("INSERT INTO tasks (task, start_date, due_date) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $task, $start, $due);
    $stmt->execute();
    $stmt->close();
}

$conn->close();
?>