# Integrating a New Payment Provider on VTEX

Step-by-step guide for integrating a payment provider into VTEX.

---

## Integration Steps

### 1. Understand the Payment Provider Protocol (PPP)

Read the PPP overview and API reference. Meet all [implementation prerequisites](https://help.vtex.com/en/tutorial/payment-provider-protocol--RdsT2spdq80MMwwOeEq0m#implementation-prerequisites).

### 2. Define the Operation Environment

| Environment | Notes |
|---|---|
| **Ecommerce only** | Works across all VTEX virtual stores, national and international |
| **Physical stores only** | Uses VTEX Sales App; connectors also use PPP; Payment App required |
| **Both** | Single connector can handle both environments |

> For operating in countries outside your home country, ensure compliance with local financial regulations and sign a VTEX partnership agreement.

### 3. Select Infrastructure Type

| Infrastructure | Description |
|---|---|
| **Internal** | Build your own middleware; requires PCI-DSS certification or Secure Proxy |
| **VTEX IO (PPF)** | Use Payment Provider Framework — no manual API route config, built-in security, serverless |

**Payment Provider Framework (PPF)** advantages:
- Reuse VTEX templates and clients
- Serverless — no infrastructure investment
- Simplified auth integrated with VTEX systems

### 4. Define the Purchase Flow

| Flow | Description |
|---|---|
| **Transparent** | Customer enters payment data directly in VTEX checkout (recommended) |
| **Payment App** | Custom experience via VTEX IO app — no external redirect |
| **Redirect** | Customer redirected to external page (lowest conversion, least recommended) |

> Physical store connectors (VTEX Sales App) **must** use Payment App.

Optional: Create a custom layout (HTML/CSS) for Payment App or Redirect displayed on VTEX Checkout.

#### Configuration Flow (Optional)

Three endpoints (`/authorization/token`, `/authorization/redirect`, `/authorization/credentials`) allow merchants to authenticate your connector via VTEX Admin using `appKey`, `appToken`, and `applicationId`.

### 5. Additional Requirements

| Feature | Requirement |
|---|---|
| Debit/credit/co-branded cards | PCI-DSS certification or Secure Proxy |
| Physical store (Venda Direta) | Configure `Venda Direta Credito` and `Venda Direta Debito` in manifest |
| Split Payout | Implement Split Payouts on PPP |
| Custom Auto Capture | Implement Custom Auto Capture Feature |

> Before adding `paymentMethods` in your manifest, check existing names in the List Payment Provider Manifest endpoint — use the same spelling and capitalization.

### 6. Connector Tests

Use **Test Suite App** to test:
- `POST /payments` — Create Payment
- `POST /payments/{paymentId}/cancellations` — Cancel Payment
- `POST /payments/{paymentId}/settlements` — Settle Payment
- `POST /payments/{paymentId}/refunds` — Refund Payment

Also simulate a full order placement in your test store.

### 7. Homologation and Go-live

1. Open a [VTEX support ticket](https://help.vtex.com/en/tutorial/opening-tickets-to-vtex-support--16yOEqpO32UQYygSmMSSAM) requesting homologation
2. SLA: **30 days** (may vary with inconsistencies found)
3. After approval, connector becomes available to VTEX Admin merchants
4. Optional: publish on VTEX App Store for broader visibility

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — PPP for POS](./payments-ppp-pos.md)
