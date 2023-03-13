<?php
include('db.php');

//GET ALL THE CLIENTS TO EXPORT
$sql = 'SELECT * FROM clients';

if (!($stmt = $db->prepare($sql))) {
    echo "Prepare failed: (" . $db->errno . ") " . $db->error;
}

// $stmt->execute();
if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}

$result = $stmt->get_result();
$allClients = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($allClients);
$stmt->close();
// echo (json_encode([
//     'clients' => $result]));