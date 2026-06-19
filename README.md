<div align="center">

  <h1>Vtex Io Mcp</h1>

  <p><em>MCP server for VTEX IO development — Store Framework, React, Node services, GraphQL, Admin, and more</em></p>

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
  </p>

  <p>
    <a href="#-mcp-oficial-de-vtex">MCP oficial de VTEX</a> ·
    <a href="#-acerca-de">Acerca de</a> ·
    <a href="#-instalación">Instalación</a> ·
    <a href="#-uso">Uso</a> ·
    <a href="#-scripts">Scripts</a> ·
    <a href="#-changelog">Changelog</a> ·
    <a href="#-licencia">Licencia</a> ·
    <a href="#-autor">Autor</a>
  </p>

</div>

---

> [!IMPORTANT]
> **Este proyecto ya no se mantiene y existe solo para estudio.**
> No habrá más actualizaciones, _pull requests_ ni _issues_. El repositorio se mantiene
> público únicamente para que puedas clonarlo, leer el código y aprender cómo está hecho.
>
> Para uso real, VTEX ya ofrece su **MCP oficial**:
> 👉 https://www.vtex.com/en-us/vtex-vision/developer-mcp
>
> Consulta la sección [MCP oficial de VTEX](#-mcp-oficial-de-vtex) más abajo.

## 🏛️ MCP oficial de VTEX

El **VTEX AI Developer Toolkit** ofrece herramientas que los agentes de IA y asistentes de
código pueden usar al trabajar con la plataforma VTEX. Son dos, y pueden usarse por separado
o juntas: **VTEX Developer MCP** (busca documentación y referencias de API bajo demanda
durante una tarea) y **VTEX Skills** (carga contexto persistente sobre patrones de
arquitectura, restricciones de la plataforma y guías de implementación específicas de VTEX).

### VTEX Developer MCP

El paquete `@vtex/developer-mcp` es un servidor [MCP](https://modelcontextprotocol.io/) que
conecta a los asistentes de código con la documentación de VTEX
([Help Center](https://help.vtex.com/) y [Developer Portal](https://developers.vtex.com/)) y
con la [referencia de API](https://developers.vtex.com/docs/api-reference). Corre en local,
no requiere API key ni autenticación, y expone 4 tools:

- `search_documentation` — busca documentación relevante según una consulta.
- `fetch_document` — obtiene el contenido completo de un artículo por URL.
- `search_endpoints` — busca endpoints de la API según una consulta.
- `get_endpoint_details` — obtiene la especificación OpenAPI completa de un endpoint.

Compatible con Cursor, VS Code + GitHub Copilot, Claude Code y Claude Desktop. Instrucciones
de configuración por asistente:
[VTEX Developer MCP](https://developers.vtex.com/docs/guides/vtex-developer-mcp).

### VTEX Skills

Catálogo de _skills_ para desarrollo en la plataforma VTEX. Una _skill_ es un archivo de
texto plano que el agente carga como contexto persistente antes de generar código, con guías
de implementación específicas de VTEX que los asistentes genéricos no conocen de forma
fiable. Están organizadas por tracks (FastStore, Payment, VTEX IO, Marketplace, Headless).
Instalación recomendada con `npx`, que detecta las herramientas compatibles que tengas
instaladas y coloca los archivos donde cada una los espera:

```sh
npx skills add vtex/skills
```

Más opciones y el catálogo completo:
[VTEX Skills](https://developers.vtex.com/docs/guides/vtex-skills).

---

> [!NOTE]
> Lo que sigue es la documentación histórica del paquete de la comunidad (`vtex-io-mcp`),
> conservada solo como referencia de estudio.

## 📖 Acerca de

MCP server for VTEX IO development — Store Framework, React, Node services, GraphQL, Admin, and more

Una herramienta de línea de comandos (CLI).

## 📦 Instalación

```bash
pnpm add -g vtex-io-mcp
```

## 💻 Uso

```bash
vtex-io-mcp --help
```

## 📜 Scripts

| Comando | Qué hace |
| --- | --- |
| `pnpm build` | `tsc && chmod 755 build/index.js` |
| `pnpm lint` | `tsc --noEmit` |
| `pnpm dev` | `tsc --watch` |
| `pnpm ingest:courses` | `tsx scripts/ingest-vtex-courses.ts` |
| `pnpm ingest:apps` | `tsx scripts/ingest-vtex-app-docs.ts` |
| `pnpm inspect` | `npx @modelcontextprotocol/inspector build/index.js` |

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
