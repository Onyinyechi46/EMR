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

// Get doctor info
$stmt = $conn->prepare("SELECT name, email, specialization, hospital, consultation_fee, available_days, available_hours, bio, rating FROM doctors WHERE pkh = ?");
$stmt->bind_param("s", $pkh);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Doctor not found']);
    $stmt->close();
    exit;
}

$doctor = $result->fetch_assoc();

echo json_encode([
    'success' => true,
    'doctor' => [
        'pkh' => $pkh,
        'name' => $doctor['name'],
        'email' => $doctor['email'],
        'specialization' => $doctor['specialization'],
        'hospital' => $doctor['hospital'],
        'fee' => $doctor['consultation_fee'],
        'available_days' => $doctor['available_days'],
        'available_hours' => $doctor['available_hours'],
        'bio' => $doctor['bio'],
        'rating' => $doctor['rating']
    ]
]);

$stmt->close();
$conn->close();
?>