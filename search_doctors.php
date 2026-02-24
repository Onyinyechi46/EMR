<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$term = $_GET['term'] ?? '';

if (empty($term) || strlen($term) < 2) {
    echo json_encode(['success' => true, 'doctors' => []]);
    exit;
}

$search_term = "%$term%";

// Search doctors by name, specialization, or hospital
$stmt = $conn->prepare("
    SELECT pkh, name, email, specialization, hospital, consultation_fee, rating 
    FROM doctors 
    WHERE is_active = 1 AND (name LIKE ? OR specialization LIKE ? OR hospital LIKE ?)
    ORDER BY rating DESC, name ASC
    LIMIT 20
");

$stmt->bind_param("sss", $search_term, $search_term, $search_term);
$stmt->execute();
$result = $stmt->get_result();

$doctors = [];
while ($row = $result->fetch_assoc()) {
    $doctors[] = [
        'pkh' => $row['pkh'],
        'name' => $row['name'],
        'email' => $row['email'],
        'specialization' => $row['specialization'],
        'hospital' => $row['hospital'],
        'fee' => $row['consultation_fee'],
        'rating' => $row['rating']
    ];
}

echo json_encode([
    'success' => true,
    'doctors' => $doctors,
    'count' => count($doctors)
]);

$stmt->close();
$conn->close();
?>