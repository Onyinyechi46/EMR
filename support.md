# Support

## Where to Ask Questions

- **GitHub Discussions**: Preferred for Q&A, feature ideas, and general questions
- **GitHub Issues**: For bug reports and actionable work items
- **Email**: support@emr-pro.com (for sensitive/private matters)

## Response Expectations

- Best effort basis – this is an open-source educational project
- Community support is encouraged – help each other out!
- Pull Requests are always welcome for fixes and improvements
- We aim to acknowledge issues within 3-5 business days

## What to Include in Bug Reports

### Environment Information
- **OS**: Windows/Linux/macOS version
- **Browser**: Chrome/Firefox/Edge version
- **PHP version**: `php --version`
- **MySQL version**: `mysql --version`
- **Node version**: `node --version` (if applicable)
- **Lace Wallet version**: From wallet settings

### Application Information
- **EMR Pro version**: From CHANGELOG or footer
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happened
- **Error messages**: Full error text or screenshots
- **Transaction hashes**: If applicable
- **Console logs**: Press F12 → Console tab, copy any errors

### Example Bug Report

```markdown
**Description:**
Appointment request fails with error

**Environment:**
- OS: Windows 11
- Browser: Chrome 121.0.6167.140
- PHP: 8.1.2
- MySQL: 8.0.33
- EMR Pro: v1.4.0

**Steps to reproduce:**
1. Go to patient.html
2. Connect wallet (0x1234...)
3. Click "Request Appointment"
4. Select "Dr. Smith"
5. Choose tomorrow's date
6. Click Submit

**Expected behavior:**
Appointment created and appears in list

**Actual behavior:**
Red error message: "Failed to request appointment"

**Error message:**
`[12:34:56] ❌ Failed to request appointment: Insufficient ADA`

**Console logs:**
```
Uncaught (in promise) Error: Insufficient ADA balance
    at requestAppointment (patient.html:123)
```


## Common Issues and Solutions

| Issue | Likely Solution |
|-------|----------------|
| Wallet won't connect | Install Lace wallet, unlock it, refresh page |
| "Insufficient ADA" | Add at least 3 ADA to your wallet |
| Records not loading | Click "Refresh" or reconnect wallet |
| Appointment not showing | Check Pending/Confirmed tabs, refresh dashboard |
| Registration fails | Verify email format, all required fields filled |
| Transaction hangs | Check network status, try again later |
| Wrong network error | Switch wallet to Preprod testnet |

## Getting Help Faster

To help us help you faster:

✅ **DO:**
- Search existing issues first
- Provide clear steps to reproduce
- Include exact error messages
- Mention what you've already tried
- Use descriptive titles

❌ **DON'T:**
- Post sensitive information (private keys, passwords)
- Create duplicate issues
- Ask questions in issue comments (use Discussions)
- Expect instant responses (we're human!)

## Contributing

Found a fix? We love pull requests! Check our [Contributing Guide](CONTRIBUTING.md) to get started.

## Feedback

We're always looking to improve. Have suggestions for better support? Let us know in GitHub Discussions!
