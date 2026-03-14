# RapiDoc
Custom Element for Open-API spec viewing. Used by VTEX Docs portal.

## Features
- Supports Swagger 2.0, OpenAPI 3.x.x
- Works with any framework or with no framework
- Allows making API calls
- Models and Examples are expanded by default
- Request fields are pre-populated with sample data
- Themes: Dark and Light
- Embed inside React, Vue, Angular, Lit-Element
- Lightweight and fast
- Load local JSON spec from disk

## Build Process
```bash
npm install
npm run build   # generates rapidoc-min.js
npm run serve   # dev server at port 8080
```

## Docker Usage
```bash
docker run -it --rm -p 80:80 -e SPEC_URL="http://petstore.swagger.io/v2/swagger.json" rapidoc
docker run -it --rm -p 80:80 -e SPEC_URL="..." -e RAPIDOC_OPTIONS="theme='dark'" mrin9/rapidoc
```
