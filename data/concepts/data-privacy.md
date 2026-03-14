# Data Privacy

This guide presents an overview of VTEX's approach towards data privacy, including how the platform helps merchants and developers protect shoppers' personal data.

## Data processed by VTEX

VTEX follows the principle of **data minimization** — collecting, processing, and storing only the information essential to achieving a specific purpose.

VTEX processes shoppers' personal data only when strictly necessary. The types of personal data that may be processed include:

- Name
- Email address
- IP address
- Browsing information (cookies)
- Cart information
- Order information and history
- Delivery address
- ID number (when required by the country)
- Gift card history
- Unused cart
- Conversation Tracker information
- Session passwords (encrypted)
- Generated tokens

VTEX does not sell, monetize, enrich, or transfer shoppers' personal data to other companies.

## Data lifecycle

All data on the platform has a lifecycle divided into four phases:

1. **Creation**: Process for creating or collecting data
2. **Storage**: Data that will be reused is stored
3. **Processing**: Data is processed and used to achieve business objectives. During this stage, data can be refined, merged, or aggregated
4. **Disposal**: When data is no longer needed, it is permanently disposed of

### Retention limits

- VTEX stores shopper personal data for the duration of the Master Services Agreement (MSA)
- In the event of contract termination, merchants must extract data from Master Data within **30 days** before the termination date
- Merchants are responsible for complying with local laws and regulations regarding data retention periods

## Data subject rights

VTEX offers tools for merchants to assist shoppers with requests related to data subject rights:

- Access and portability
- Rectification
- Consent
- Erasure

> ⚠️ VTEX is not responsible for personal data stored by systems integrated with your store (ERPs, third-party marketplaces, third-party applications, or customizations). Merchants must map this data and ensure enforceability of data subject rights in these instances.

## Data protection mechanisms

### Data in transit

Protected by **TLS 1.2** security standard. Connections using older, less secure encryption methods are denied.

### Data at rest

VTEX can use the following encryption algorithms:

**Two-way encryption:**
- RSA with keys of 2048 bits or more
- AES-256

**One-way encryption:**
- PBKDF2 based on SHA-256

### Backups

All relevant systems make daily automatic backups by default.

## Storage location

- Hosting provider: **Amazon Web Services (AWS)**
- Data stored in: **Northern Virginia region, United States**
- AWS certifications: ISO 27001, PCI DSS, CSA, NIST

## Policies and compliance

VTEX has privacy and data protection policies reviewed annually. VTEX is committed to complying with all applicable data protection regulations, including:

- **GDPR** (General Data Protection Regulation)
- **LGPD** (Lei Geral de Proteção de Dados — Brazilian data protection law)

Merchants should add their own privacy policies to their websites to comply with local privacy regulations.

---

Source: https://developers.vtex.com/docs/guides/data-privacy
