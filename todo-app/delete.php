<?php
include "config.php";

if(isset($_POST['id'])) {

    $id = intval($_POST['id']);

    $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
}

$conn->close();
?>