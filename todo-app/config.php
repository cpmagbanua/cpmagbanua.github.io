<?php

$conn = new mysqli("localhost", "root", "", "todo_db");

if($conn->connect_error){
    die("Database Connection Failed");
}

?>