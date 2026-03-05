<?php
include "config.php";

$sql = "SELECT id, task, start_date, due_date FROM tasks ORDER BY id DESC";
$result = $conn->query($sql);

$tasks = [];
while($row = $result->fetch_assoc()){
    $tasks[] = $row;
}

echo json_encode($tasks);
$conn->close();
?>