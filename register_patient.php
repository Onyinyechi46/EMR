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
$dob = $_POST['dob'] ?? null;
$blood_group = $_POST['blood_group'] ?? null;
$address = $_POST['address'] ?? null;
$emergency_contact = $_POST['emergency_contact'] ?? null;
$emergency_phone = $_POST['emergency_phone'] ?? null;
$allergies = $_POST['allergies'] ?? null;
$medications = $_POST['medications'] ?? null;
$primary_doctor = $_POST['primary_doctor'] ?? null;

// Validate required fields
if (empty($pkh) || empty($name) || empty($email) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Required fields missing']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Check if patient already exists
$check_stmt = $conn->prepare("SELECT id FROM patients WHERE pkh = ? OR email = ?");
$check_stmt->bind_param("ss", $pkh, $email);
$check_stmt->execute();
$check_result = $check_stmt->get_result();

if ($check_result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Patient already registered with this PKH or email']);
    $check_stmt->close();
    exit;
}
$check_stmt->close();

// Insert new patient
$stmt = $conn->prepare("
    INSERT INTO patients (
        pkh, name, email, phone, date_of_birth, blood_group, address,
        emergency_contact, emergency_phone, allergies, medications
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "sssssssssss",
    $pkh, $name, $email, $phone, $dob, $blood_group, $address,
    $emergency_contact, $emergency_phone, $allergies, $medications
);

if ($stmt->execute()) {
    // If primary doctor provided, add to patient_doctors
    if (!empty($primary_doctor)) {
        // Check if doctor exists
        $doctor_check = $conn->prepare("SELECT id FROM doctors WHERE pkh = ?");
        $doctor_check->bind_param("s", $primary_doctor);
        $doctor_check->execute();
        $doctor_result = $doctor_check->get_result();
        
        if ($doctor_result->num_rows > 0) {
            $doctor_stmt = $conn->prepare("
                INSERT INTO patient_doctors (patient_pkh, doctor_pkh, is_primary) 
                VALUES (?, ?, 1)
            ");
            $doctor_stmt->bind_param("ss", $pkh, $primary_doctor);
            $doctor_stmt->execute();
            $doctor_stmt->close();
        }
        $doctor_check->close();
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'patient_id' => $stmt->insert_id
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $conn->error]);
}

$stmt->close();
$conn->close();
?>