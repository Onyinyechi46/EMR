<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$term = $_GET['term'] ?? '';

if (empty($term) || strlen($term) < 2) {
    echo json_encode(['success' => true, 'patients' => []]);
    exit;
}

$search_term = "%$term%";

// Search patients by name or email
$stmt = $conn->prepare("
    SELECT pkh, name, email, phone 
    FROM patients 
    WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?
    ORDER BY name ASC
    LIMIT 20
");

$stmt->bind_param("sss", $search_term, $search_term, $search_term);
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