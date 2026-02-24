# EMR Pro - Blockchain Medical Records System
## Complete Documentation

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Installation Guide](#installation-guide)
4. [Database Structure](#database-structure)
5. [User Roles](#user-roles)
6. [Features](#features)
7. [User Guides](#user-guides)
8. [API Reference](#api-reference)
9. [Blockchain Integration](#blockchain-integration)
10. [Security Features](#security-features)
11. [Troubleshooting](#troubleshooting)

---

## System Overview

EMR Pro is a decentralized Electronic Medical Records system built on the Cardano blockchain. It provides a secure, transparent, and patient-controlled platform for managing medical records, appointments, and prescriptions.

### Key Benefits
- **Patient-Controlled**: Patients own and control access to their medical data
- **Blockchain Secured**: All records are immutably stored on Cardano
- **User-Friendly**: No blockchain expertise required
- **Emergency Access**: Secure emergency protocols for critical situations
- **Audit Trail**: Complete history of all accesses and changes

---

## Technology Stack

### Frontend
- **HTML5/CSS3**: Responsive UI design
- **JavaScript**: Client-side logic
- **Lucid Cardano**: Blockchain interaction library

### Backend
- **PHP 7.4+**: Server-side processing
- **MySQL 5.7+**: Database management
- **Apache/Nginx**: Web server

### Blockchain
- **Cardano Network**: Preprod/Testnet
- **Blockfrost API**: Blockchain interaction
- **Plutus Scripts**: Smart contracts

### Wallet
- **Lace Wallet**: Required for blockchain transactions

---

## Installation Guide

### Prerequisites
```bash
# Required Software
- XAMPP/WAMP/LAMP (PHP 7.4+)
- MySQL 5.7+
- Composer (optional)
- Lace Wallet browser extension
```

### Step-by-Step Installation

1. **Clone the Repository**
```bash
git clone https://github.com/your-repo/emr-pro.git
cd emr-pro
```

2. **Configure Database**
```sql
CREATE DATABASE emr_pro;
USE emr_pro;

-- Import database schema
SOURCE database.sql;
```

3. **Configure Database Connection**
Edit `config.php`:
```php
<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'emr_pro');
?>
```

4. **Configure Blockchain Settings**
In `emr.js`, update:
```javascript
const BLOCKFROST_URL = "https://cardano-preprod.blockfrost.io/api/v0";
const BLOCKFROST_KEY = "your-blockfrost-api-key";
const NETWORK = "Preprod";
```

5. **Set File Permissions**
```bash
chmod 755 -R /path/to/emr-pro
chmod 644 *.php *.html *.js
```

6. **Access the Application**
```
http://localhost/emr-pro/index.html
```

---

## Database Structure

### Tables

#### 1. `patients`
```sql
CREATE TABLE patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pkh VARCHAR(255) UNIQUE NOT NULL, -- Wallet PubKeyHash
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    date_of_birth DATE,
    blood_group VARCHAR(10),
    address TEXT,
    emergency_contact VARCHAR(255),
    emergency_phone VARCHAR(50),
    allergies TEXT,
    medications TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);
```

#### 2. `doctors`
```sql
CREATE TABLE doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pkh VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    license_number VARCHAR(100) UNIQUE NOT NULL,
    specialization VARCHAR(100),
    hospital VARCHAR(255),
    consultation_fee DECIMAL(10,2),
    address TEXT,
    available_days VARCHAR(100),
    available_hours VARCHAR(50),
    bio TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. `appointments` (localStorage)
```javascript
{
    id: "apt_1645234567890_abc123",
    doctor: "doctor_pkh_123...",
    doctorName: "Dr. Sarah Johnson",
    patient: "patient_pkh_456...",
    patientName: "John Doe",
    date: "2024-03-15",
    time: "10:00",
    reason: "Regular Check-up",
    notes: "Patient reports headaches",
    status: "pending|confirmed|completed|rejected",
    requestedAt: "2024-03-10T10:30:00Z"
}
```

#### 4. `prescriptions` (localStorage)
```javascript
{
    id: "rx_1645234567890_xyz789",
    doctor: "doctor_pkh_123...",
    doctorName: "Dr. Sarah Johnson",
    patient: "patient_pkh_456...",
    patientName: "John Doe",
    medicines: [
        {
            name: "Amoxicillin",
            dosage: "500mg",
            frequency: "Twice daily",
            duration: 7
        }
    ],
    instructions: "Take with food",
    diagnosis: "Bacterial infection",
    date: "2024-03-15",
    expiry: "2024-04-14",
    allowRefills: true,
    refills: 2,
    refillsUsed: 0
}
```

---

## User Roles

### Patient Portal
- View medical records
- Request appointments
- View prescriptions
- Emergency access to records
- Verify record authenticity
- Manage doctors list
- View health timeline

### Doctor Portal
- Create medical records
- Issue prescriptions
- Manage appointments
- Patient search
- Emergency patient access
- Batch operations
- Audit logs
- Schedule management

---

## Features

### 1. **Patient Features**

#### Medical Records Management
- View all personal medical records
- Filter by date, doctor, status
- Verify record authenticity
- Export records as JSON/HTML
- Share records with doctors

#### Appointment System
- Request appointments with doctors
- View upcoming appointments
- Track appointment status
- Cancel/reject appointments
- Automatic reminders

#### Prescription Management
- View active prescriptions
- Check prescription expiry
- Print prescriptions
- Request refills
- View medication history

#### Emergency Access
- One-click emergency access
- Reason selection dropdown
- Automatic audit logging
- Doctor notification
- Access history

#### Doctor Directory
- Search doctors by name/specialization
- View doctor profiles
- Request appointments directly
- Save favorite doctors

### 2. **Doctor Features**

#### Patient Management
- Search patients by name/email
- View patient profiles
- Access patient history
- Emergency patient access
- Patient notes

#### Record Creation
- Create medical records
- Multiple record types
- Encryption options
- Follow-up scheduling
- Blockchain submission

#### Prescription Writing
- Multi-medicine prescriptions
- Dosage and frequency
- Expiry dates
- Refill management
- Print prescriptions

#### Appointment Management
- View pending requests
- Confirm/reject appointments
- Schedule view
- Appointment history
- Patient notifications

#### Emergency Protocols
- Emergency patient search
- Immediate record access
- Reason documentation
- Audit trail
- Emergency alerts

---

## User Guides

### Patient Guide

#### 1. **Getting Started**

**Registration:**
1. Install Lace wallet browser extension
2. Visit `patient.html`
3. Click "Connect Wallet"
4. Complete registration form
5. Select primary doctor (optional)

**Login:**
1. Open Lace wallet
2. Visit `patient.html`
3. Click "Connect Wallet"
4. Approve connection in wallet

#### 2. **Viewing Records**

**Dashboard:**
- Total records count
- Pending results
- Upcoming appointments
- Recent records list

**Full Records View:**
1. Click "My Records"
2. View all records with details
3. Click record to expand
4. Copy record hash
5. Export data

#### 3. **Requesting Appointments**

1. Click "Request Appointment"
2. Search for doctor by name
3. Select date and time
4. Choose reason
5. Add notes
6. Submit request

#### 4. **Managing Prescriptions**

**View Prescriptions:**
1. Click "My Prescriptions"
2. Filter by Active/Expired/All
3. Click prescription for details
4. Print or request refill

**Request Refill:**
1. Open prescription details
2. Click "Request Refill"
3. Confirm request
4. Appointment created automatically

#### 5. **Emergency Access**

1. Click "Emergency Access"
2. Select your doctor
3. Select record to access
4. Choose reason
5. Confirm access
6. View record details

### Doctor Guide

#### 1. **Getting Started**

**Registration:**
1. Install Lace wallet
2. Visit `doctor.html`
3. Click "Connect Wallet"
4. Complete registration form
5. Set availability schedule

**Login:**
1. Open Lace wallet
2. Visit `doctor.html`
3. Click "Connect Wallet"
4. Approve connection

#### 2. **Creating Records**

1. Click "New Record"
2. Search for patient
3. Select record type
4. Enter summary
5. Choose encryption
6. Set follow-up
7. Submit (3 ADA fee)

#### 3. **Issuing Prescriptions**

1. Click "New Prescription"
2. Search for patient
3. Add medicines (name, dosage, frequency, duration)
4. Add instructions
5. Set dates
6. Configure refills
7. Submit

#### 4. **Managing Appointments**

**Pending Requests:**
- View in left column
- Click "Confirm" or "Reject"
- Add notes if needed

**Schedule View:**
- Today's appointments
- Time slots
- Patient details
- Quick actions

#### 5. **Emergency Patient Access**

1. Click "Emergency Access"
2. Search patient by name
3. Select record
4. Choose reason
5. Confirm access
6. View full record

---

## API Reference

### PHP Endpoints

#### `get_patient_info.php`
**GET** - Get patient information
```php
// Request
GET /get_patient_info.php?pkh=patient_pkh_123

// Response
{
    "success": true,
    "patient": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "dob": "1990-01-01",
        "blood_group": "O+",
        "address": "123 Main St"
    }
}
```

#### `get_doctor_info.php`
**GET** - Get doctor information
```php
// Request
GET /get_doctor_info.php?pkh=doctor_pkh_123

// Response
{
    "success": true,
    "doctor": {
        "name": "Dr. Sarah Johnson",
        "email": "sarah@hospital.com",
        "specialization": "Cardiologist",
        "hospital": "City Hospital",
        "fee": "150.00",
        "rating": 4.8
    }
}
```

#### `search_doctors.php`
**GET** - Search doctors by name/specialization
```php
// Request
GET /search_doctors.php?term=cardiologist

// Response
{
    "success": true,
    "doctors": [
        {
            "pkh": "doctor_pkh_123",
            "name": "Dr. Sarah Johnson",
            "specialization": "Cardiologist",
            "hospital": "City Hospital"
        }
    ]
}
```

#### `search_patients.php`
**GET** - Search patients by name/email
```php
// Request
GET /search_patients.php?term=john

// Response
{
    "success": true,
    "patients": [
        {
            "pkh": "patient_pkh_456",
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "+1234567890"
        }
    ]
}
```

#### `register_patient.php`
**POST** - Register new patient
```php
// Request
POST /register_patient.php
{
    "pkh": "patient_pkh_123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "dob": "1990-01-01",
    "blood_group": "O+"
}

// Response
{
    "success": true,
    "message": "Registration successful",
    "patient_id": 1
}
```

#### `register_doctor.php`
**POST** - Register new doctor
```php
// Request
POST /register_doctor.php
{
    "pkh": "doctor_pkh_123",
    "name": "Dr. Sarah Johnson",
    "email": "sarah@hospital.com",
    "license": "MED123456",
    "specialization": "Cardiologist"
}

// Response
{
    "success": true,
    "message": "Registration successful",
    "doctor_id": 1
}
```

### Blockchain Functions (emr.js)

#### `submitRecord()`
Submit new medical record to blockchain
```javascript
// Creates transaction with 3 ADA deposit
// Returns transaction hash
```

#### `resolveRecord()`
Mark record as resolved
```javascript
// Only patient or doctor can resolve
// Updates record status on blockchain
```

#### `verifyRecord()`
Verify record authenticity
```javascript
// Compares provided summary hash with stored hash
// Returns verification result
```

---

## Blockchain Integration

### Smart Contract Details

**Script Type:** Plutus V2
**Network:** Cardano Preprod
**Deposit:** 3 ADA per record
**Datum Structure:**
```javascript
{
    patient: Bytes,      // Patient's PubKeyHash
    doctor: Bytes,       // Doctor's PubKeyHash
    recordHash: Bytes,   // SHA256 of record summary
    resolved: Boolean    // Resolution status
}
```

### Transaction Flow

1. **Create Record**
   - User submits record summary
   - System generates SHA256 hash
   - Creates transaction with datum
   - Pays 3 ADA deposit
   - Returns transaction hash

2. **Resolve Record**
   - Patient/doctor initiates resolution
   - Creates new UTXO with resolved=true
   - Returns deposit (future feature)

3. **Emergency Access**
   - No blockchain transaction
   - Local audit logging only
   - Notifies relevant parties

---

## Security Features

### 1. **Blockchain Security**
- Immutable record storage
- Cryptographic verification
- Decentralized architecture
- No single point of failure

### 2. **Access Control**
- Wallet-based authentication
- Role-based permissions
- Patient data ownership
- Granular sharing controls

### 3. **Emergency Protocol**
- Audited emergency access
- Reason documentation
- Automatic notifications
- Time-limited access

### 4. **Data Protection**
- Optional encryption
- Hash-based verification
- No plaintext storage
- Secure API endpoints

### 5. **Audit Trail**
- All accesses logged
- Emergency access flagged
- Share history maintained
- Complete transaction history

---

## Troubleshooting

### Common Issues

#### 1. **Wallet Connection Failed**
**Symptoms:**
- "Lace wallet not found" error
- Connection timeout

**Solutions:**
- Install Lace wallet extension
- Ensure wallet is unlocked
- Refresh page and retry
- Check network selection

#### 2. **Registration Failed**
**Symptoms:**
- "Patient already registered" error
- Validation errors

**Solutions:**
- Check email format
- Ensure unique PKH
- Verify all required fields
- Contact support if persistent

#### 3. **Transaction Failed**
**Symptoms:**
- Insufficient ADA error
- Transaction timeout

**Solutions:**
- Ensure wallet has sufficient ADA
- Check network connectivity
- Wait and retry
- Verify script address

#### 4. **Records Not Loading**
**Symptoms:**
- Empty records list
- Loading spinner never stops

**Solutions:**
- Check wallet connection
- Refresh UTXO set
- Verify script address
- Clear browser cache

#### 5. **Appointment Issues**
**Symptoms:**
- Appointments not showing
- Status not updating

**Solutions:**
- Check localStorage
- Verify patient/doctor PKH
- Refresh dashboard
- Re-request if needed

### Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Lace wallet not found" | Wallet not installed | Install Lace wallet |
| "Insufficient ADA" | Not enough funds | Add ADA to wallet |
| "Record not found" | Invalid hash | Verify record hash |
| "Unauthorized" | Wrong role/permission | Check wallet role |
| "Network error" | Connection issue | Check internet/network |

---

## Support

### Contact
- **Email:** rmambeda@gmail.com
- **GitHub:** github.com/ridotshila

### Resources
- [Cardano Developer Portal](https://developers.cardano.org)
- [Lucid Documentation](https://lucid.spacebudz.io)
- [Blockfrost API Docs](https://blockfrost.io)

### Version History
- **v1.0.0** - Initial release
- **v1.1.0** - Added prescriptions
- **v1.2.0** - Emergency access
- **v1.3.0** - Audit logging
- **v1.4.0** - Enhanced UI/UX

---

## License

Copyright © 2026 EMR Pro. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or use of this software is strictly prohibited.


---

*Documentation last updated: February 2024*
