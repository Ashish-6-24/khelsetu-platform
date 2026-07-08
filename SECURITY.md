# Security Policy

## Supported Versions

KhelSetu is under active development on `master`. Security fixes are applied
to the latest commit only; there are no maintained release branches yet.

| Version           | Supported |
| ----------------- | --------- |
| `master` (latest) | Yes       |

## Reporting a Vulnerability

Please do not open a public GitHub issue for security vulnerabilities.

Instead, use GitHub's private vulnerability reporting for this repository:
`Security` tab > `Report a vulnerability`. This opens a private conversation
with the maintainer and does not disclose the issue publicly until a fix is
available.

If you cannot use that channel, contact the maintainer directly through the
profile listed on this repository.

Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce
- Relevant logs, screenshots, or proof-of-concept code

You can expect an initial response within a few days. This is a solo-maintained
project without a dedicated security team, so response times will not match a
large organization's SLA. Reports are still taken seriously and will be
addressed as promptly as possible.

## Automated Security Tooling

This repository already runs, on every push and pull request:

- CodeQL static analysis for common vulnerability patterns
- npm audit for known-vulnerable dependencies
- Dependency Review on pull requests
- Dependabot for automated dependency updates

Reports found through these automated tools are triaged the same way as
manually reported ones.
