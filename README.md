<div align="center">

  <h1>VTEX IO MCP</h1>

  <p><em>Servidor MCP de la comunidad para desarrollo en VTEX IO — Store Framework, React, servicios Node, GraphQL, Admin y más.</em></p>

  <p>
    <a href="https://github.com/zeluizr/vtex-io-mcp/actions"><img alt="CI" src="https://badgen.net/github/checks/zeluizr/vtex-io-mcp"></a>
    <a href="https://www.npmjs.com/package/vtex-io-mcp"><img alt="npm" src="https://badgen.net/npm/v/vtex-io-mcp"></a>
    <a href="https://www.npmjs.com/package/vtex-io-mcp"><img alt="downloads" src="https://badgen.net/npm/dm/vtex-io-mcp"></a>
    <a href="./LICENSE"><img alt="license" src="https://badgen.net/github/license/zeluizr/vtex-io-mcp"></a>
    <a href="https://github.com/zeluizr/vtex-io-mcp/stargazers"><img alt="stars" src="https://badgen.net/github/stars/zeluizr/vtex-io-mcp"></a>
    <a href="https://github.com/zeluizr/vtex-io-mcp/commits"><img alt="last commit" src="https://badgen.net/github/last-commit/zeluizr/vtex-io-mcp"></a>
    <img alt="estado" src="https://badgen.net/badge/estado/solo%20estudio/orange">
  </p>

  <p>
    <img alt="TypeScript" src="https://badgen.net/badge/TypeScript/lang/blue">
    <img alt="Node.js" src="https://badgen.net/badge/Node.js/runtime/green">
    <img alt="MCP" src="https://badgen.net/badge/MCP/server/purple">
  </p>

  <p>
    <a href="#-mcp-oficial-de-vtex">MCP oficial de VTEX</a> ·
    <a href="#-acerca-de">Acerca de</a> ·
    <a href="#-herramientas">Herramientas</a> ·
    <a href="#-instalación">Instalación</a> ·
    <a href="#-uso">Uso</a> ·
    <a href="#-desarrollo-local">Desarrollo local</a> ·
    <a href="#-licencia">Licencia</a>
  </p>

</div>

---

> [!IMPORTANT]
> **Este proyecto ya no se mantiene y existe únicamente con fines de estudio.**
> No habrá nuevas versiones, _pull requests_ ni _issues_. El repositorio permanece público
> para que puedas clonarlo, leer el código y entender cómo está construido.
>
> Para uso real, VTEX ofrece su **MCP oficial**:
> **https://www.vtex.com/en-us/vtex-vision/developer-mcp**
>
> Consulta la sección [MCP oficial de VTEX](#-mcp-oficial-de-vtex) más abajo.

## 🏛️ MCP oficial de VTEX

El **VTEX AI Developer Toolkit** reúne las herramientas que los agentes de IA y los
asistentes de código pueden usar al trabajar con la plataforma VTEX. Son dos y se pueden
usar por separado o en conjunto: **VTEX Developer MCP** (recupera documentación y referencia
de API bajo demanda durante una tarea) y **VTEX Skills** (carga contexto persistente sobre
patrones de arquitectura, restricciones de la plataforma y guías de implementación
específicas de VTEX).

### VTEX Developer MCP

El paquete `@vtex/developer-mcp` es un servidor [MCP](https://modelcontextprotocol.io/) que
conecta a los asistentes de código con la documentación de VTEX
([Help Center](https://help.vtex.com/) y [Developer Portal](https://developers.vtex.com/)) y
con la [referencia de API](https://developers.vtex.com/docs/api-reference). Se ejecuta en
local, no requiere clave de API ni autenticación, y expone cuatro herramientas:

| Herramienta | Descripción |
| --- | --- |
| `search_documentation` | Encuentra documentación relevante a partir de una consulta. |
| `fetch_document` | Recupera el contenido completo de un artículo por su URL. |
| `search_endpoints` | Encuentra _endpoints_ de la API a partir de una consulta. |
| `get_endpoint_details` | Recupera la especificación OpenAPI completa de un _endpoint_. |

Es compatible con Cursor, VS Code + GitHub Copilot, Claude Code y Claude Desktop. Las
instrucciones de configuración por asistente están en
[VTEX Developer MCP](https://developers.vtex.com/docs/guides/vtex-developer-mcp).

### VTEX Skills

Catálogo de _skills_ para el desarrollo en la plataforma VTEX. Una _skill_ es un archivo de
texto plano que el agente carga como contexto persistente antes de generar código, con guías
de implementación específicas de VTEX que los asistentes genéricos no conocen de forma
fiable. Están organizadas por _tracks_ (FastStore, Payment, VTEX IO, Marketplace y Headless).
La instalación recomendada es con `npx`, que detecta las herramientas compatibles que tengas
instaladas y coloca los archivos donde cada una los espera:

```sh
npx skills add vtex/skills
```

Más opciones y el catálogo completo en
[VTEX Skills](https://developers.vtex.com/docs/guides/vtex-skills).

---

> [!NOTE]
> Lo que sigue documenta el paquete de la comunidad (`vtex-io-mcp`), conservado solo como
> referencia de estudio. Su funcionalidad fue superada por el MCP oficial de VTEX descrito
> arriba.

## 📖 Acerca de

`vtex-io-mcp` es un servidor [MCP](https://modelcontextprotocol.io/) (Model Context Protocol)
pensado como copiloto para el desarrollo en VTEX IO. Embebe una base de conocimiento (blocks
de Store Framework, builders, conceptos y cursos oficiales) y la expone como herramientas que
tu asistente de IA puede invocar para generar _scaffolding_ de apps, consultar props de
blocks y buscar documentación, sin salir del editor.

Se comunica por `stdio` y funciona con cualquier cliente MCP: Claude Desktop, Claude Code,
Cursor y similares.

## 🧰 Herramientas

| Herramienta | Descripción |
| --- | --- |
| `scaffold-vtex-app` | Genera una app VTEX IO completa: `manifest.json` y la estructura de carpetas de los builders seleccionados (store, react, node, graphql, styles, messages, admin, pixel). |
| `scaffold-node-service` | Genera un servicio Node.js: `index.ts`, `service.json`, clients y middlewares para las rutas y eventos indicados. |
| `scaffold-graphql` | Genera el `schema.graphql` y los resolvers en TypeScript para queries y mutations. |
| `lookup-block-props` | Consulta props, descripción y ejemplos de uso de cualquier block de Store Framework. |
| `add-block` | Genera un fragmento JSONC listo para pegar en `blocks.jsonc`, validando las props contra el esquema del block. |
| `lookup-vtex-api` | Consulta la referencia REST de las APIs de VTEX (catalog, orders, checkout, master-data, logistics, pricing, intelligent-search y más). |
| `search-concepts` | Busca por palabras clave en la documentación de VTEX IO y devuelve resultados con extractos. |
| `explain-concept` | Devuelve la documentación completa de un concepto de VTEX IO por su ID. |
| `search-courses` | Busca un término en los cursos oficiales de VTEX IO y devuelve extractos con contexto. |

## 📦 Instalación

No requiere instalación: tu cliente MCP puede ejecutar el paquete bajo demanda con `npx`
(ver [Uso](#-uso)). Si prefieres instalarlo de forma global:

```bash
npm install -g vtex-io-mcp
```

> Requiere **Node.js 18 o superior**.

## 💻 Uso

Añade el servidor a la configuración MCP de tu asistente. Por ejemplo, en Claude Desktop
(`claude_desktop_config.json`):

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

Al reiniciar el cliente, las [herramientas](#-herramientas) quedan disponibles y el asistente
las invoca según las necesite durante una tarea.

## 🛠️ Desarrollo local

```bash
git clone https://github.com/zeluizr/vtex-io-mcp.git
cd vtex-io-mcp
npm install
npm run build
npm run inspect   # abre el MCP Inspector para probar el servidor
```

### Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run build` | Compila TypeScript (`tsc`) y marca el binario como ejecutable. |
| `npm run lint` | Verificación de tipos (`tsc --noEmit`). |
| `npm run dev` | Compilación en modo _watch_. |
| `npm run ingest:courses` | Procesa el repositorio de cursos de VTEX. |
| `npm run ingest:apps` | Procesa los README de las apps de VTEX. |
| `npm run inspect` | Abre el [MCP Inspector](https://github.com/modelcontextprotocol/inspector) sobre el servidor compilado. |

## 📝 Changelog

Consulta el historial de cambios en [`CHANGELOG.md`](./CHANGELOG.md).

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver [`LICENSE`](./LICENSE).

## 👤 Autor

**José Luiz Rodrigues**

<a href="https://github.com/zeluizr"><img alt="GitHub" src="https://badgen.net/badge/GitHub/zeluizr/black?icon=github"></a>
<a href="https://www.npmjs.com/~zeluizr"><img alt="npm" src="https://badgen.net/badge/npm/zeluizr/red?icon=npm"></a>

---

<div align="center">
  <sub>Hecho con ☕ por <a href="https://github.com/zeluizr">@zeluizr</a></sub>
</div>
