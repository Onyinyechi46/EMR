<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$pkh = $_POST['pkh'] ?? '';

if (empty($pkh)) {
    echo json_encode(['success' => false, 'message' => 'PKH required']);
    exit;
}

// Get patient info
$stmt = $conn->prepare("SELECT id, name, email, phone FROM patients WHERE pkh = ?");
$stmt->bind_param("s", $pkh);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Patient not found. Please register first.']);
    $stmt->close();
    exit;
}

$patient = $result->fetch_assoc();

// Log login
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';

$log_stmt = $conn->prepare("
    INSERT INTO login_history (pkh, ip_address, user_agent) 
    VALUES (?, ?, ?)
");
$log_stmt->bind_param("sss", $pkh, $ip, $user_agent);
$log_stmt->execute();
$log_stmt->close();

// Update last login
$update_stmt = $conn->prepare("UPDATE patients SET last_login = NOW() WHERE pkh = ?");
$update_stmt->bind_param("s", $pkh);
$update_stmt->execute();
$update_stmt->close();

// Set session
$_SESSION['patient_pkh'] = $pkh;
$_SESSION['patient_name'] = $patient['name'];
$_SESSION['logged_in'] = true;

echo json_encode([
    'success' => true,
    'message' => 'Login successful',
    'patient' => [
        'name' => $patient['name'],
        'email' => $patient['email'],
        'phone' => $patient['phone']
    ]
]);

$stmt->close();
$conn->close();
?>