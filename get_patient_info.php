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

// Get patient info
$stmt = $conn->prepare("SELECT name, email, phone, date_of_birth, blood_group, address FROM patients WHERE pkh = ?");
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
    'patient' => [
        'name' => $patient['name'],
        'email' => $patient['email'],
        'phone' => $patient['phone'],
        'dob' => $patient['date_of_birth'],
        'blood_group' => $patient['blood_group'],
        'address' => $patient['address']
    ]
]);

$stmt->close();
$conn->close();
?>