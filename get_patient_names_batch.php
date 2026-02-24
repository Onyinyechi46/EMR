<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$pkhs = $input['pkhs'] ?? [];

if (empty($pkhs) || !is_array($pkhs)) {
    echo json_encode(['success' => false, 'message' => 'PKH array required']);
    exit;
}

// Create placeholders for IN clause
$placeholders = implode(',', array_fill(0, count($pkhs), '?'));
$types = str_repeat('s', count($pkhs));

$sql = "SELECT pkh, name, email, phone FROM patients WHERE pkh IN ($placeholders)";
$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$pkhs);
$stmt->execute();
$result = $stmt->get_result();

$patients = [];
while ($row = $result->fetch_assoc()) {
    $patients[] = [
        'pkh' => $row['pkh'],
        'name' => $row['name'],
        'email' => $row['email'],
        'phone' => $row['phone']
    ];
}

echo json_encode([
    'success' => true,
    'patients' => $patients,
    'count' => count($patients)
]);

$stmt->close();
$conn->close();
?>