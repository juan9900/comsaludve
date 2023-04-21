
<?php
// $host = "127.0.0.1";
// $username = "root";
// $password = '';
// $database = "comsalud";

$host = "localhost";
$username = "comsaludve_admin";
$password = "comsaluddbadmin";
$database = "comsaludve_db";


$db = mysqli_connect($host, $username, $password, $database);

if (!$db) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
?>
