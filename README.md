# EMR Pro - Blockchain Medical Records System

![Version](https://img.shields.io/badge/version-1.4.0-blue)
![Cardano](https://img.shields.io/badge/blockchain-Cardano-3ccb91)
![License](https://img.shields.io/badge/license-proprietary-red)
![Status](https://img.shields.io/badge/status-production-green)

## 📋 Overview

EMR Pro is a decentralized Electronic Medical Records (EMR) system built on the Cardano blockchain. It provides a secure, transparent, and patient-controlled platform for managing medical records, appointments, and prescriptions. Patients own their data and control who can access it, while healthcare providers can efficiently manage patient care with blockchain-verified records.

### 🌟 Key Features

- **🔐 Patient-Controlled Data**: Patients own and control access to their medical records
- **⛓️ Blockchain Secured**: Immutable record storage on Cardano
- **📱 User-Friendly**: No blockchain expertise required
- **🚨 Emergency Access**: Secure emergency protocols with audit trail
- **📊 Complete Audit Trail**: All accesses and changes are logged
- **💊 Prescription Management**: Digital prescriptions with refill tracking
- **📅 Appointment System**: Seamless appointment scheduling
- **👥 Multi-Role Support**: Separate portals for patients and doctors

## 🚀 Quick Start

### Prerequisites

- **Lace Wallet** browser extension (required for blockchain transactions)
- **Web Server** with PHP 7.4+ and MySQL 5.7+
- **Cardano Testnet ADA** for transactions (get from faucet)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/emr-pro.git
   cd emr-pro
   ```

2. **Set up the database**
   ```bash
   # Import database schema
   mysql -u root -p < database.sql
   ```

3. **Configure database connection**
   Edit `config.php`:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'root');
   define('DB_PASS', 'your_password');
   define('DB_NAME', 'emr_pro');
   ```

4. **Configure blockchain settings**
   Edit `emr.js`:
   ```javascript
   const BLOCKFROST_URL = "https://cardano-preprod.blockfrost.io/api/v0";
   const BLOCKFROST_KEY = "your_blockfrost_api_key";
   const NETWORK = "Preprod";
   ```

5. **Set file permissions**
   ```bash
   chmod 755 /path/to/emr-pro
   chmod 644 *.php *.html *.js
   ```

6. **Access the application**
   ```
   http://localhost/emr-pro/index.html
   ```

## 📖 User Guides

### For Patients

#### Registration
1. Install Lace wallet extension
2. Visit `patient.html`
3. Click "Connect Wallet"
4. Complete the registration form
5. Select your primary doctor (optional)

#### Dashboard Features
- **View Records**: Access all your medical records
- **Request Appointments**: Schedule appointments with doctors
- **Manage Prescriptions**: View and refill prescriptions
- **Emergency Access**: Quick access to your records in emergencies
- **Find Doctors**: Search for healthcare providers

#### Requesting an Appointment
1. Click "Request Appointment"
2. Search for a doctor by name
3. Select date and time
4. Choose reason for visit
5. Add notes and submit

### For Doctors

#### Registration
1. Install Lace wallet
2. Visit `doctor.html`
3. Click "Connect Wallet"
4. Complete registration with license details
5. Set your availability schedule

#### Daily Workflow
- **View Appointments**: Check pending and confirmed appointments
- **Create Records**: Add new medical records (3 ADA fee)
- **Issue Prescriptions**: Write digital prescriptions
- **Emergency Access**: Access patient records in emergencies
- **Manage Schedule**: Update availability and fees

## 🏗️ Architecture

### Technology Stack

```
Frontend          → HTML5, CSS3, JavaScript
Blockchain Layer  → Cardano, Lucid, Blockfrost
Backend           → PHP, MySQL
Wallet            → Lace Wallet
```

### Database Schema

```sql
-- Patients table
CREATE TABLE patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pkh VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    date_of_birth DATE,
    blood_group VARCHAR(10),
    -- ... additional fields
);

-- Doctors table
CREATE TABLE doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pkh VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    specialization VARCHAR(100),
    -- ... additional fields
);
```

### Smart Contract

Medical records are stored on the Cardano blockchain with the following datum structure:
```javascript
{
    patient: Bytes,      // Patient's PubKeyHash
    doctor: Bytes,       // Doctor's PubKeyHash
    recordHash: Bytes,   // SHA256 hash of record summary
    resolved: Boolean    // Resolution status
}
```

## 🔧 API Reference

### PHP Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `get_patient_info.php` | GET | Get patient details |
| `get_doctor_info.php` | GET | Get doctor details |
| `search_doctors.php` | GET | Search doctors by name/specialization |
| `search_patients.php` | GET | Search patients by name/email |
| `register_patient.php` | POST | Register new patient |
| `register_doctor.php` | POST | Register new doctor |

### Blockchain Functions

| Function | Description |
|----------|-------------|
| `submitRecord()` | Create new medical record (3 ADA) |
| `resolveRecord()` | Mark record as resolved |
| `verifyRecord()` | Verify record authenticity |

## 🛡️ Security Features

- **Wallet Authentication**: Secure login via Cardano wallet
- **Blockchain Storage**: Immutable record storage
- **Audit Trail**: All accesses are logged
- **Emergency Protocol**: Documented emergency access
- **Data Encryption**: Optional encryption for sensitive data
- **Role-Based Access**: Separate patient and doctor permissions

## 🚨 Emergency Access Protocol

The system includes a secure emergency access feature:

1. Patient/doctor initiates emergency access
2. Selects the record and provides reason
3. Access is logged with timestamp
4. All parties are notified
5. Complete audit trail maintained

## 📊 File Structure

```
emr-pro/
├── index.html              # Role selection page
├── patient.html             # Patient portal
├── doctor.html              # Doctor portal
├── register_patient.html    # Patient registration
├── register_doctor.html     # Doctor registration
├── style.css                # Global styles
├── emr.js                   # Blockchain functions
├── config.php               # Database configuration
├── *.php                    # API endpoints
└── README.md                # This file
```

## 🔍 Troubleshooting

### Common Issues

**Q: Wallet won't connect**
A: Ensure Lace wallet is installed and unlocked. Refresh the page and try again.

**Q: Transaction fails with "Insufficient ADA"**
A: You need at least 3 ADA for record creation. Get testnet ADA from a faucet.

**Q: Records not loading**
A: Check wallet connection and refresh the UTXO set. Verify you're on the correct network.

**Q: Registration fails**
A: Ensure all required fields are filled and email format is correct. The PKH must be unique.

## 📝 License

Copyright © 2026 EMR Pro. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## 🤝 Support


- **Email**: rmambeda@gmail.com

## 🙏 Acknowledgments

- Cardano Foundation for blockchain infrastructure
- Blockfrost for API services
- Lace wallet team for wallet integration
- All contributors and testers

## 📈 Roadmap

- [x] Basic record management
- [x] Appointment system
- [x] Prescription management
- [x] Emergency access
- [ ] Mobile app
- [ ] Insurance integration
- [ ] Telemedicine features
- [ ] Multi-language support

---

**Built with ❤️ for better healthcare**
