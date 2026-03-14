# PCI-DSS Compliance for Payment Providers

PCI-DSS (Payment Card Industry Data Security Standard) requirements for VTEX payment connectors.

---

## Compliance Level Required

VTEX requires **PCI-DSS Level 1** compliance for connectors that handle raw card data.

- Level 1 = merchants/providers processing **more than 6 million transactions per year**
- Highest level of PCI-DSS compliance
- Annual on-site audit by a Qualified Security Assessor (QSA)

---

## Accepted Documentation

| Document | Accepted |
|---|---|
| **AOC** (Attestation of Compliance) | ✅ Required |
| **SAQ** (Self-Assessment Questionnaire) | ❌ Not accepted |

> Only the AOC (signed by a QSA) is accepted during homologation. SAQs are not sufficient.

---

## When AOC Is Required

You must attach an AOC to your homologation ticket when:

- Connector processes **credit cards**
- Connector processes **debit cards**
- Connector processes **co-branded cards** (store + network partnership)

Connectors using **VTEX Secure Proxy** are exempt from PCI-DSS compliance — Secure Proxy handles all raw card data on VTEX's PCI-certified infrastructure.

---

## Using Secure Proxy to Avoid PCI-DSS

The recommended path for most connectors:

1. Set `usesSecureProxy: true` in PPF configuration (this is the **default**)
2. VTEX tokenizes card fields before they reach your connector
3. Your connector receives `numberToken`, `holderToken`, `cscToken` — never raw card data
4. PCI-DSS obligation shifts to VTEX

See [Secure Proxy](./payments-secure-proxy.md) for implementation details.

---

## Without Secure Proxy

If `usesSecureProxy: false`:

- Your infrastructure handles raw card data
- You must be PCI-DSS Level 1 certified
- AOC required before VTEX approves the connector
- Submit AOC with the homologation ticket

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — Secure Proxy](./payments-secure-proxy.md)
- [Payments — Homologation](./payments-homologation.md)
- [Payments — PPF](./payments-provider-framework.md)
