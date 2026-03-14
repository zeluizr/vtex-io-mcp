# External Marketplace — VTEX Marketplace Setup

For a VTEX store to act as a marketplace and sell products from external sellers, three steps are required per seller:

1. Register the seller in the marketplace Admin
2. Activate the seller for a trade policy
3. Set up API authentication credentials

---

## Step 1 — Register the Seller

External sellers must be registered in the marketplace before they can integrate.

**Via API:**

```
POST /seller-register/pvt/sellers    # Configure Seller Account
```

**Via Admin:** Marketplace > Sellers > Management > Add Seller

Key field: **Fulfillment Endpoint** — the seller's endpoint that receives Fulfillment Simulation requests from the marketplace. Implement this on the seller side.

> The **seller ID** created during this step is used as an identifier in most subsequent API calls of the integration.

---

## Step 2 — Activate Seller for a Trade Policy

Trade policies define which sellers are active for each sales channel. After creating the seller, the marketplace must activate it for the relevant trade policies.

**Admin path:** Marketplace Management > Trade Policies > Alter → select sellers to activate

Each trade policy can be enabled for a different subset of sellers.

---

## Step 3 — Set Up API Authentication Credentials

All private VTEX API requests require an **appKey / appToken** pair.

Create credentials via: **Account Settings > Application Keys > New application key**

Store the credentials securely and share them with the external seller.

---

## What to Share with the External Seller

After completing setup, provide the seller with:

- **Marketplace account name**
- **appKey / appToken** (for authenticating API requests to the marketplace)
- **Seller ID** (assigned during registration)
- Trade policy configuration details

## Documentation

- [External Marketplace Integration](./external-marketplace-integration.md)
- [External Marketplace — Architecture](./external-marketplace-architecture.md)
- [External Marketplace — VTEX Seller Setup](./external-marketplace-seller-setup.md)
- [Authentication](./authentication.md)
