# vtex-io-mcp

**Servidor MCP de la comunidad para desarrollar en VTEX IO: Store Framework, React, servicios Node, GraphQL, Admin y más.**

`vtex-io-mcp` es un servidor [MCP](https://modelcontextprotocol.io/) (Model Context Protocol) que funciona como copiloto de VTEX IO dentro de Claude Code, Claude Desktop, Cursor o cualquier cliente MCP. Trae una base de conocimiento embebida (blocks de Store Framework, builders, documentación y cursos oficiales) y la expone como herramientas para generar _scaffolding_ de apps, consultar props de blocks y buscar documentación, sin salir del editor y sin conexión a internet.

[![npm](https://img.shields.io/npm/v/vtex-io-mcp?color=142032)](https://www.npmjs.com/package/vtex-io-mcp)
[![node](https://img.shields.io/node/v/vtex-io-mcp)](https://nodejs.org)
[![licencia](https://img.shields.io/npm/l/vtex-io-mcp)](./LICENSE)

---

> [!NOTE]
> El proyecto vuelve a estar en desarrollo activo. Entre junio y septiembre de 2026 estuvo marcado como archivado y "solo estudio"; la versión publicada en npm (0.1.5) todavía es de ese período.

## Instalación

No hace falta instalar nada: el cliente MCP ejecuta el paquete bajo demanda con `npx` (ver [Uso](#uso)). Si prefieres una instalación global:

```bash
npm install -g vtex-io-mcp
```

## Uso

### Claude Code

```bash
claude mcp add vtex-io -- npx -y vtex-io-mcp
```

### Claude Desktop, Cursor y otros clientes

Añade el servidor a la configuración MCP del cliente (en Claude Desktop, `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "vtex-io": {
      "command": "npx",
      "args": ["-y", "vtex-io-mcp"]
    }
  }
}
```

Al reiniciar el cliente, las herramientas quedan disponibles y el asistente las invoca cuando la tarea lo pide. Algunos pedidos que las activan:

- "Crea una app VTEX IO con los builders react, node, graphql y store"
- "¿Qué props acepta el `flex-layout.row`?"
- "Genera un servicio Node con una ruta `/_v/hello` y un handler para el evento de cambio de pedido"
- "Busca en la documentación cómo funcionan las CSS Handles"

## Referencia

### Herramientas

| herramienta | qué hace |
| --- | --- |
| `scaffold-vtex-app` | Genera una app VTEX IO: `manifest.json` y la estructura de carpetas de los builders elegidos (store, react, node, graphql, styles, messages, admin, pixel). |
| `scaffold-node-service` | Genera un servicio Node: `index.ts`, `service.json`, clients y middlewares para las rutas y eventos indicados. |
| `scaffold-graphql` | Genera `schema.graphql` y los resolvers en TypeScript para queries y mutations. |
| `lookup-block-props` | Devuelve props, descripción y ejemplos de un block de Store Framework. |
| `add-block` | Genera un fragmento JSONC listo para `blocks.jsonc`, validando las props contra el esquema del block. |
| `lookup-vtex-api` | Consulta la referencia REST de las APIs de VTEX (catalog, orders, checkout, master-data, logistics, pricing, intelligent-search, session, headless-cms, promotions, payments-gateway, license-manager). |
| `search-concepts` | Busca por palabras clave en los 391 documentos de la base y devuelve resultados con extractos. |
| `explain-concept` | Devuelve el documento completo de un concepto por su ID. |
| `search-courses` | Busca un término en los cursos oficiales de VTEX IO y devuelve extractos con contexto. |

### Resources

| URI | contenido |
| --- | --- |
| `vtex://concepts` | Índice de los documentos de la base, agrupados por prefijo. |
| `vtex://concepts/{conceptId}` | Documento completo de un concepto. |
| `vtex://courses` | Índice de los cursos, con título, descripción y número de pasos. |
| `vtex://courses/{id}` | Contenido completo de un curso. |

### Base de conocimiento

| carpeta | contenido |
| --- | --- |
| `data/blocks/` | `rich-text`, `info-card`, `flex-layout.row`, `flex-layout.col`, `shelf`, `image` |
| `data/builders/` | `store`, `node` |
| `data/concepts/` | 391 documentos de VTEX (builders, APIs, Store Framework, services, known issues y más) |
| `data/courses/` | 10 cursos: onboarding, basic-blocks, layout-blocks, styles-course, store-block, service-course, calling-commerce-apis, admin, content-workflow, store-performance |

### Relación con el MCP oficial de VTEX

VTEX publica su propio servidor, [`@vtex/developer-mcp`](https://developers.vtex.com/docs/guides/vtex-developer-mcp), que busca y recupera en línea la documentación del Help Center y del Developer Portal y la referencia de API. `vtex-io-mcp` no lo sustituye: se centra en generar código de apps VTEX IO y funciona con la base embebida, sin red. Los dos se pueden instalar en el mismo cliente.

## Requisitos

- Node `>= 18`
- Transporte `stdio`, compatible con cualquier cliente MCP

## Estructura

```text
src/
├── index.ts          # entry point del binario
├── server.ts         # McpServer: registra tools y resources
├── tools/            # una herramienta por archivo, registradas en tools/index.ts
├── resources/        # resources vtex://concepts y vtex://courses
└── knowledge/        # carga y búsqueda sobre data/
data/                 # base de conocimiento, se publica junto con build/
```

## Desarrollo

```bash
git clone https://github.com/zeluizr/vtex-io-mcp.git
cd vtex-io-mcp
npm install
npm run build
npm run inspect   # abre el MCP Inspector sobre build/index.js
```

| comando | qué hace |
| --- | --- |
| `npm run build` | Compila TypeScript en `build/` y marca el binario como ejecutable. |
| `npm run lint` | Verificación de tipos (`tsc --noEmit`). |
| `npm run dev` | Compilación en modo _watch_. |
| `npm run inspect` | Abre el [MCP Inspector](https://github.com/modelcontextprotocol/inspector) sobre el servidor compilado. |

Convenciones: TypeScript ESM, Prettier sin punto y coma y con comillas simples, [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/). El CI corre `lint` y `build` en Node 18, 20 y 22.

### Ramas y publicación

El trabajo nace en una rama salida de `dev` y el PR va contra `dev`. De ahí se promueve a `qa` y, después de probar, a `main`, siempre con merge de la rama completa.

La publicación en npm la hace el workflow `publish.yml` al subir un tag `v*`: compila, publica con _provenance_ y crea el GitHub Release. Versión y `CHANGELOG.md` se actualizan antes de crear el tag.

## Changelog

Ver [`CHANGELOG.md`](./CHANGELOG.md).

## Licencia

[MIT](./LICENSE)

_Hecho con amor y café por [zeluizr](https://github.com/zeluizr) y con la ayuda de [Claude](https://claude.ai/referral/Cz_UimA0NQ) ☕_
