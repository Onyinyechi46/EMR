# Security Policy

## Supported Versions

We release security updates for the following versions of EMR Pro:

| Version | Supported          |
| ------- | ------------------ |
| 1.4.x   | :white_check_mark: |
| 1.3.x   | :white_check_mark: |
| 1.2.x   | :white_check_mark: |
| 1.1.x   | :x:                |
| 1.0.x   | :x:                |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of EMR Pro seriously. If you believe you have found a security vulnerability, please follow these steps:

### 📧 Where to Report

**DO NOT** report security vulnerabilities through public GitHub issues.

Instead, please send an email to: **rmambeda@gmail.com**

### 📋 What to Include

Please include the following information in your report:

- **Type of vulnerability** (e.g., SQL injection, cross-site scripting, etc.)
- **Affected versions** of EMR Pro
- **Steps to reproduce** with clear, concise instructions
- **Proof of concept** or example code (if applicable)
- **Impact** of the vulnerability
- **Your contact information** for follow-up questions

### 🔒 Encryption

For sensitive reports, you can use our PGP key:

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
[PGP key would be here]
-----END PGP PUBLIC KEY BLOCK-----
```

### ⏱️ Response Timeline

We strive to respond to security reports as follows:

1. **Acknowledgment**: Within 48 hours of receiving your report
2. **Verification**: Within 5 business days to verify the vulnerability
3. **Fix Development**: Timeline depends on complexity, but we aim for:
   - Critical issues: 7-14 days
   - High severity: 14-30 days
   - Medium/low severity: Next release cycle
4. **Disclosure**: Coordinated disclosure after fix is released

### 🔄 What to Expect

- **If accepted**: We will:
  - Develop and test a fix
  - Release a security update
  - Credit you in the security advisory (unless you prefer anonymity)
  - Not disclose your information without permission

- **If declined**: We will:
  - Explain why the issue is not considered a security vulnerability
  - Provide guidance on alternative reporting channels if appropriate

## 🛡️ Security Features

### Data Protection
- **Blockchain Storage**: Medical records stored immutably on Cardano
- **Encryption**: Optional data encryption for sensitive information
- **Hash Verification**: SHA256 hashing for record authenticity

### Access Control
- **Wallet Authentication**: Secure login via Cardano wallet
- **Role-Based Access**: Separate patient and doctor permissions
- **Emergency Protocol**: Audited emergency access system

### Audit Trail
- **All Accesses Logged**: Complete history of record views
- **Emergency Flagging**: Unauthorized attempts are flagged
- **Share Tracking**: All record shares are monitored

## 🔐 Best Practices for Users

### Patients
- Never share your wallet private keys
- Use a strong wallet password
- Keep your recovery phrase secure
- Log out after each session
- Verify record authenticity regularly

### Doctors
- Only access records you are authorized to view
- Document all emergency accesses
- Keep your system updated
- Use secure networks
- Report suspicious activity immediately

## 📋 Security Checklist for Deployment

- [ ] Use HTTPS in production
- [ ] Keep PHP and MySQL updated
- [ ] Regular security audits
- [ ] Monitor access logs
- [ ] Backup data regularly
- [ ] Use strong database passwords
- [ ] Restrict file permissions
- [ ] Enable error logging
- [ ] Disable debug mode in production

## 🚨 Vulnerability Disclosure Policy

We follow coordinated disclosure:

1. **Reporter** privately discloses vulnerability
2. **Maintainers** verify and develop fix
3. **Fix** is prepared in private
4. **Security release** is published
5. **Public disclosure** after users have time to update

## ⭐ Hall of Fame

We thank the following security researchers for their responsible disclosures:

| Name | Finding | Version | Date |
|------|---------|---------|------|
| - | - | - | - |

*Want to see your name here? Report a vulnerability responsibly!*

## 📞 Contact

- **Security Email**: rmambeda@gmail.com
- **PGP Fingerprint**: [Fingerprint would be here]
- **Bug Bounty**: Not currently offered

---

*Last updated: February 2025*
