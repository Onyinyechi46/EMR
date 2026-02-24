<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get POST data
$pkh = $_POST['pkh'] ?? '';
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$license = $_POST['license'] ?? '';
$specialization = $_POST['specialization'] ?? '';
$hospital = $_POST['hospital'] ?? '';
$fee = $_POST['fee'] ?? null;
$address = $_POST['address'] ?? '';
$available_days = $_POST['available_days'] ?? '';
$available_from = $_POST['available_from'] ?? '09:00';
$available_to = $_POST['available_to'] ?? '17:00';
$bio = $_POST['bio'] ?? '';

// Validate required fields
if (empty($pkh) || empty($name) || empty($email) || empty($phone) || empty($license) || empty($specialization)) {
    echo json_encode(['success' => false, 'message' => 'Required fields missing']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Check if doctor already exists
$check_stmt = $conn->prepare("SELECT id FROM doctors WHERE pkh = ? OR email = ? OR license_number = ?");
$check_stmt->bind_param("sss", $pkh, $email, $license);
$check_stmt->execute();
$check_result = $check_stmt->get_result();

if ($check_result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Doctor already registered with this PKH, email, or license']);
    $check_stmt->close();
    exit;
}
$check_stmt->close();

// Format available hours
$available_hours = $available_from . '-' . $available_to;

// Insert new doctor
$stmt = $conn->prepare("
    INSERT INTO doctors (
        pkh, name, email, phone, license_number, specialization, 
        hospital, consultation_fee, address, available_days, 
        available_hours, bio
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssssssssss",
    $pkh, $name, $email, $phone, $license, $specialization,
    $hospital, $fee, $address, $available_days,
    $available_hours, $bio
);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'doctor_id' => $stmt->insert_id
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $conn->error]);
}

$stmt->close();
$conn->close();
?>