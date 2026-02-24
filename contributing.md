# Contributing to EMR Pro

Thank you for your interest in contributing to **EMR Pro**! We welcome all contributions—bug fixes, new features, documentation improvements, or anything that helps make this project better for the healthcare and blockchain community.

## 🚀 Getting Started

### 1. Fork the Repository

Click the **Fork** button at the top right of the GitHub page to create your own copy of the repo.

### 2. Clone Your Fork

```bash
git clone https://github.com/your_username/emr.git
cd emr
```

### 3. Create a Branch

Create a feature or fix branch based on `main`:

```bash
git checkout -b your-feature-name
```

### 4. Make Your Changes

Make sure to:

- Follow consistent code style (HTML/CSS/JavaScript/PHP)
- Write meaningful commit messages
- Update relevant documentation
- Test your changes locally

### 5. Commit and Push

```bash
git add .
git commit -m "Brief description of your change"
git push origin your-feature-name
```

### 6. Open a Pull Request

Go to the GitHub page of your fork and click **"Compare & pull request"**. Fill out the PR template and submit it for review.

## 🧪 Running Locally

This project requires a local web server environment:

### Prerequisites
- XAMPP/WAMP/LAMP (PHP 7.4+)
- MySQL 5.7+
- Lace Wallet browser extension

### Setup
1. Start your local web server
2. Import the database schema
3. Configure `config.php` with your database credentials
4. Access the application at `http://localhost/emr`

## ✅ Code Guidelines

- **Keep pull requests focused and minimal** – one feature or fix per PR
- **Follow existing code style** – maintain consistency
- **Test your changes** – ensure functionality works
- **Consider security** – never expose sensitive data
- **Use meaningful variable/function names** – self-documenting code

## 📁 Folder Structure

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
└── README.md                # Project documentation
```

## 🔐 Security Guidelines

Given the sensitive nature of medical data:

- **NEVER commit real patient data** – use anonymized test data
- **Report security vulnerabilities** privately to security@emr-pro.com
- **Never share wallet private keys** or credentials
- **Follow responsible disclosure** practices

## 💬 Need Help?

- Open a **GitHub Issue** for bugs or feature requests
- Start a **Discussion** for questions or ideas
- Tag **@Ridotshila** in a comment for feedback

## 🙌 Recognition

Contributors will be acknowledged in our monthly releases and on our contributors page.

Thanks again for helping improve **EMR**! 🙌
