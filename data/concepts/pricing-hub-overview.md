# Pricing Hub

Pricing Hub is a system developed for the **B2B context** that works as an intermediary between VTEX and external pricing systems.

---

## Overview

In B2B operations, pricing can be highly complex — different prices per customer, negotiated contracts, volume discounts, and price tables specific to each buyer. Pricing Hub enables VTEX to delegate price calculation to an external system that specializes in this logic.

### How It Works

Instead of using VTEX's native pricing engine, the store configures Pricing Hub to forward price queries to an external pricing provider. The external system returns the calculated prices, which Pricing Hub then supplies to the VTEX checkout experience.

---

## Use Case

Typical B2B scenario:

1. Shopper (a company buyer) adds items to cart
2. VTEX Checkout queries Pricing Hub for item prices
3. Pricing Hub forwards the query to the external pricing system
4. External system returns prices based on buyer-specific contracts/rules
5. Checkout displays the correct negotiated prices

---

## Key Characteristics

- Designed for **B2B commerce** with complex pricing rules
- Acts as a **proxy/intermediary** between VTEX and external pricing APIs
- Enables custom pricing logic without modifying VTEX's native behavior
- Compatible with VTEX IO service apps

---

## Documentation

- [Pricing Hub Overview](https://developers.vtex.com/docs/guides/pricing-hub-overview)
