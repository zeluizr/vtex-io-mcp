# Admin SSO — SAML 2.0 Integration

Integrate an external Identity Provider (IdP) with the VTEX Admin panel for Single Sign-On (SSO).

> Only SAML 2.0 is supported for Admin SSO. Other authentication protocols are not supported.

---

## SAML Roles

| Role | Description |
|---|---|
| **Identity Provider (IdP)** | External authentication system. Authenticates users and sends assertions. Never sends passwords. |
| **Service Provider (SP)** | VTEX ID — receives assertions and grants access. |

VTEX only supports **Authentication Assertion** type (states that a user was authenticated at a particular time).

---

## Identity Provider Configuration

Download the SP metadata file or configure manually:

**SP Metadata URL:**
```
https://vtexid.vtex.com.br/api/vtexid/pub/saml/{accountName}/sp/metadata
```

**Manual configuration values:**

| Field | Value |
|---|---|
| ACS | `https://vtexid.vtex.com.br/api/vtexid/pub/saml/{accountName}/idps/{accountName}-saml/sso` |
| NameID | `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` |
| EntityDescriptor | `https://identity-broker.vtex.com/{accountName}/idps/{accountName}-saml` |

> `EntityDescriptor` is an **ID**, not a URL — do not configure it as one.

The IdP must send the authenticated user's email in the `saml:NameID` variable.

---

## Required Information for Setup

| Field | Description |
|---|---|
| `Provider Name` | Display name shown to users in the login options list |
| `SSO Service Endpoint` | HTTPS URL of your IdP — users are redirected here |
| `Redirect URL` | After login: `https://{accountName}.myvtex.com/` or `.../admin` |
| `Allowed Email Hosts` | Domains allowed after `@` (e.g., `company.com`). Only listed hosts are accepted. |
| `Metadata` | XML file describing your IdP (SSO/Logout URLs + signing certificate). Must include the SSO Service Endpoint. |

### Example Metadata XML

```xml
<?xml version="1.0"?>
<md:EntityDescriptor entityID="https://idp.example.org/SAML2" validUntil="2013-03-22T23:00:00Z"
    xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
    <md:IDPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol" WantAuthnRequestsSigned="false">
        <md:KeyDescriptor use="signing">
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                <ds:X509Data>
                    <ds:X509Certificate>...</ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </md:KeyDescriptor>
        <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>
        <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://idp.example.org/SAML2/SSO/Redirect"/>
        <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://idp.example.org/SAML2/SSO/POST"/>
    </md:IDPSSODescriptor>
</md:EntityDescriptor>
```

---

## Setup (Admin Panel)

1. **Admin** > **Account Settings** > **Authentication** > **Admin** tab
2. Click **Set up** in the **My SAML** section
3. Fill in the required fields
4. Upload the metadata XML
5. (Optional) Enable **Send AuthRequest** — sends `RelayState` and `SAMLRequest` on the IdP redirect URL
6. Click **Save**

---

## Certificate Renewal

When the IdP certificate is about to expire, include **both old and new certificates** in the metadata XML to allow VTEX ID to validate signatures during the transition:

```xml
<md:KeyDescriptor use="signing">
    <ds:KeyInfo>
        <ds:X509Data><ds:X509Certificate>{OLD CERTIFICATE}</ds:X509Certificate></ds:X509Data>
    </ds:KeyInfo>
</md:KeyDescriptor>
<md:KeyDescriptor use="signing">
    <ds:KeyInfo>
        <ds:X509Data><ds:X509Certificate>{NEW CERTIFICATE}</ds:X509Certificate></ds:X509Data>
    </ds:KeyInfo>
</md:KeyDescriptor>
```

VTEX ID validates the signature against each listed certificate. Once the old certificate expires, remove it from the XML and re-upload.

> Check if your IdP supports configuring a primary and secondary certificate to simplify export.

---

## Documentation

- [Authentication](./authentication.md)
- [Platform Overview](./platform-overview.md)
