---
title: 'External clients receiving 301 errors when trying to access vteximg'
source: vtexdocs/known-issues
category: Apps
kiStatus: Backlog
internalReference: 1150100
---

## Summary

When making a request through an app to access a `vteximg` endpoint on an ExternalClient, the response can be a 301 (redirect). This occurs because `colossus-legacy-proxy` is manipulating the request.

Kube-Router receives the request and sends it to `colossus-legacy-proxy` to be resolved. But the proxy changes the request from `https://{account}.vteximg.com.br` to `http://{account}.vtexcommercestable.com.br`, and this request goes back to Kube-Router. It searches this request outside of VTEX clusters, but the original resource is on `vteximg`, not `vtexcommercestable`, which leads to the redirect response (301).

## Simulation

Try to call the `vteximg` endpoint on an ExternalClient in a VTEX IO Node app.

## Workaround

No workaround available at this time.
