# Session Manager Overview

Session Manager is a VTEX module that tracks the current browsing session of all clients on the VTEX platform. Important session information is automatically captured and stored in a secure and easily accessible location — including relevant cookies, query strings, authentication credentials, current profile and pricing information.

---

## Getting and Storing Session Information

Whenever a new device contacts VTEX infrastructure, Session Manager receives a request for a new session. Events that trigger this:

- Visiting a store page
- Opening the VTEX Admin panel
- Loading the inStore (VTEX Sales App) vendor interface

After a new session is created, Session Manager receives all important navigation information associated with that device.

Using the [Session Manager API](https://developers.vtex.com/docs/api-reference/session-manager-api#overview), you can request the session data needed for your application, including inferences made by VTEX modules.

### Example

A user with a specific campaign referral link might have a promotional price table set in their session, causing them to see updated prices when navigating the store that created that campaign.

### Custom Session Data

Session Manager allows storing custom data in a session. This eliminates the need for other user tracking methods like cookies and is easily recoverable.

---

## Architecture

Session Manager is a **backend API system** that stores and processes session data in JSON objects.

Each VTEX account has settings indicating which installed apps have a **session dependency** and how they intend to process session information.

- Apps with a session dependency **monitor changes to their inputs** and **modify session parameters through their outputs**
- When a session parameter changes, Session Manager notifies all apps monitoring it
- Apps respond with any parameter updates needed
- Session Manager patches session data by compiling all responses

---

## Transform Calls

The notification / response / update cycle is called a **transform call** (or **transform**).

Transforms often trigger other transforms, repeating until apps send no further parameter updates. Loop conditions are carefully monitored.

### Transform Cycle Example

1. A change is made to session parameter **X**
2. App A monitors X → triggers **Transform 1**
3. Transform 1 causes App A to change session parameter **Y**
4. Apps B and C monitor Y → triggers **Transform 2**
5. Transform 2 causes App B to change session parameter **Z**
6. App C monitors Z → triggers **Transform 3**
7. Transform 3 has no side effects → cycle ends, session is saved

> Transform calls are made to all apps **simultaneously** for performance. That's why App C was affected by both Transform 2 and Transform 3 — it had no way of knowing that Transform 2's result on App B would lead to further changes.

---

## Create Calls

When a new session is created, a simpler cycle runs called a **create call**:

- All apps configured with `RunOnCreate: true` are notified simultaneously with an empty input
- If these apps modify parameters monitored by other apps, a standard transform cycle is triggered

---

## Documentation

- [Session Manager Apps](./session-manager-apps.md)
- [Session Manager Telesales](./session-manager-telesales.md)
- [Session Manager Impersonate API](./session-manager-impersonate-api.md)
- [API Reference](https://developers.vtex.com/docs/api-reference/session-manager-api#overview)
