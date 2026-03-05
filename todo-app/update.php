<?php
include "config.php";

if(isset($_POST['id']) && isset($_POST['task'])) {
    $id = $_POST['id'];
    $task = $_POST['task'];

    $stmt = $conn->prepare("UPDATE tasks SET task=? WHERE id=?");
    $stmt->bind_param("si", $task, $id);
    $stmt->execute();
    $stmt->close();
}

$conn->close();
?>