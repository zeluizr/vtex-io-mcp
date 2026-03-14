# Offer Management — .NET SDK

> ⚠️ **Discontinued.** Offer Management has been replaced by [Offer Status](https://help.vtex.com/en/tutorial/status-de-anuncios-beta--2OE87wU26F7lApl99OdwvJ).

.NET SDK (`SentOffers.SDK`) for integrating connectors with Offer Management.

---

## Installation

Add package reference:

```xml
<PackageReference Include="SentOffers.SDK" Version="0.0.4" />
```

Inject dependency:

```csharp
services.AddSingleton<ISentOffersClient, SentOffersClient>();
```

All API responses are wrapped in `SentOffersResponse`. Errors are listed in the `errors` attribute.

---

## Core APIs

### Create Feed

```csharp
response = await soClient.CreateFeedAsync(
  "account",
  new FeedCreateDTO {
    Id = "vtex.marketplace",
    SalesChannel = "1",
    AffiliatedId = "AFL"
  },
  credentials
);
```

### Deactivate Feed

```csharp
var response = await soClient.DeleteFeedAsync(
  "account",
  "vtex.marketplace",
  credentials
);
```

Removes channel data from UI. Seller can restore via Activate Feed endpoint.

### Create Interaction

```csharp
var response = await soClient.CreateInteractionAsync(
  "account",
  "vtex.marketplace",
  new InteractionCreateDTO {
    StartDate = DateTime.UtcNow.ToString(),
    Source = InteractionSourceType.seller,
    Origin = OriginType.inventory,
    Context = InteractionContextType.sync
  },
  credentials
);
```

### Create Log

```csharp
CreateLogDTO log = new() {
  Description = "sdk test",
  Type = "Info",
  Agent = "channel",
  Date = DateTime.Now.ToString(),
  Data = new CreateLogDataRequest() { Status = "Sending" }
};

var result = await _soClient.CreateLogAsync(
  "account", "vtex.marketplace", skuId, interactionId, log, credentials
);
```

---

## Unified Contract (Recommended)

Creates an interaction, receives a log, and closes the interaction in a single call.

> Use this route whenever possible. Specific routes should only be used when the unified contract doesn't meet the connector's needs.

```csharp
UnifiedInteractionCreateDTO unifiedContract = new() {
  Date = "2021-10-15T16:20:19.561754Z",
  Source = "channel",
  Origin = "catalog",
  Context = "ongoing",
  Description = "Info example",
  Type = "Info",
  Agent = "My-Connector"
};

var result = await _soClient.CreateUnifiedInteractionAsync(
  "account", "vtex.marketplace", skuId, unifiedContract, credentials
);
```

---

## Integration Flow Examples

### Catalog Integration (Failure log with error)

```csharp
CreateLogDTO log = new() {
  Description = "SKU sent to marketplace",
  Type = "Failure",
  Agent = "channel",
  Date = DateTime.Now.ToString(),
  Errors = new CreateLogErrorRequest[] {
    new CreateLogErrorRequest { Code = "CTLG-005" }
  }
};
```

### Price Update

```csharp
CreateLogDTO log = new() {
  Type = "Info",
  Agent = "channel",
  Date = DateTime.Now.ToString(),
  Data = new CreateLogDataRequest {
    Status = "Synchronized",
    Price = 124,
    Currency = "BRL"
  }
};
```

### Inventory Update

```csharp
CreateLogDTO log = new() {
  Type = "Info",
  Agent = "channel",
  Date = DateTime.Now.ToString(),
  Data = new CreateLogDataRequest {
    Status = "Synchronized",
    Inventory = 8
  }
};
```

---

## Documentation

- [Offer Management Connector Guide](./offer-management-connector.md)
