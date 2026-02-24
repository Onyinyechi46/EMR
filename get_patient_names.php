<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$pkh = $_GET['pkh'] ?? '';

if (empty($pkh)) {
    echo json_encode(['success' => false, 'message' => 'PKH required']);
    exit;
}

// Get patient name
$stmt = $conn->prepare("SELECT name FROM patients WHERE pkh = ?");
$stmt->bind_param("s", $pkh);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Patient not found']);
    $stmt->close();
    exit;
}

$patient = $result->fetch_assoc();

echo json_encode([
    'success' => true,
    'name' => $patient['name']
]);

$stmt->close();
$conn->close();
?>