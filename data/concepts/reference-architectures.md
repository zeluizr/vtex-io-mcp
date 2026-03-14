# Understanding VTEX Reference Architectures

VTEX reference architectures follow a common market methodology that segments the main agents involved in the solution in a simple, orderly, and logical manner. The design structure highlights systems in blocks, colors, and objective descriptions of connections, facilitating visualization and understanding for all stakeholders.

## Captions, colors, and connections

Different colors identify the characteristics of each module, indicating where they are executed and which party provides them:

| Style | Meaning |
|-------|---------|
| Pink background + pink border | Module developed exclusively by VTEX, running on VTEX infrastructure |
| White background + pink border | Module NOT developed exclusively by VTEX (customizations), running on VTEX infrastructure |
| White background + black border | Module NOT developed exclusively by VTEX (customizations), running OUTSIDE VTEX infrastructure |
| Gray background + black border | Back office services, running outside VTEX infrastructure |
| Dashed border | Optional module (e.g., Integration Layers) |

**Connection arrows:**
- **Black arrows**: Asynchronous calls (not real-time)
- **Blue arrows**: Synchronous calls (real-time)

## Macroelements: Layers

The macroelements represent the entities involved in the project. Four major layers:

1. **Merchant Channels**
2. **VTEX Core Services**
3. **Third-Party**
4. **Back Office**

Each layer has microelements (components) that constitute the project: modules, apps, integration systems, sellers, sales channels, or any other relevant component.

## Microelements: Components

### Merchant Channels

Digital sales channels used by the store, such as:
- Website
- PWA (Progressive Web App)
- Mobile app

### VTEX Core Services

Essential components or frameworks provided by VTEX within the platform:
- **Catalog**: Product, SKU, and category management
- **Order Management System (OMS)**: Order processing and management
- **Pricing**: Price rules and tables

These services constitute the foundation of the VTEX platform.

**VTEX IO - Apps block** (within Core Services):
- Custom apps for frontend, backend, and Admin — developed and maintained by the store's development team, but running on VTEX infrastructure
- **VTEX Apps**: Plug-and-play solutions developed and maintained by VTEX

### Third-Party

Systems or modules executed and maintained externally to VTEX:
- Payment providers
- Data monitoring systems
- Customization services

Third-party systems can replace a native VTEX feature or provide a completely new one, depending on business needs.

### Back Office

External systems used by ecommerce operations to manage resources and information:
- **ERP** (Enterprise Resource Planning)
- **CRM** (Customer Relationship Management)
- **WMS** (Warehouse Management System)

These systems belong to the Merchant Back Office layer and integrate with VTEX via APIs.

---

Source: https://developers.vtex.com/docs/guides/understanding-vtex-reference-architectures
