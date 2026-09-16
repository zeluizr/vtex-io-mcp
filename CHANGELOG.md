# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y este proyecto sigue el [Versionado Semántico](https://semver.org/lang/es/).

## [No publicado]

### Corregido
- El servidor MCP informa la versión del `package.json` en lugar de `0.1.0` fijo.

### Modificado
- El CI corre también en los _pull requests_ y _pushes_ a `dev` y `qa`.
- `homepage` del paquete apunta a la página de npm; se desactiva el dominio
  `vtex-io-mcp.zeluizr.com`, que redirigía al MCP oficial de VTEX.
- Nueva imagen de cabecera en el README.

## [0.1.6] - 2026-09-16

### Modificado
- El proyecto se reactiva: deja de estar archivado y vuelve a desarrollarse.
- README reescrito con el formato de servidor MCP: instalación por cliente (Claude Code,
  Claude Desktop, Cursor, VS Code, Windsurf), herramientas con parámetros, resources,
  hoja de ruta y guía para añadir herramientas. Se quitan las referencias al MCP oficial
  de VTEX.
- Imagen de cabecera en el README.
- Descripción del paquete en npm sin la marca de archivado.
- El workflow de publicación deja de aplicar la _deprecation_ en npm.

## [0.1.5] - 2026-06-19

### Corregido
- Badges del README migrados de badgen a shields.io (el badge de versión de npm
  devolvía error 500). Corrige también los badges mostrados en la página de npm.

### Modificado
- Workflow de publicación: publica solo en npmjs.com (se elimina GitHub Packages) y
  reaplica la _deprecation_ automáticamente tras publicar.

## [0.1.4] - 2026-06-19

### Modificado
- El proyecto pasa a estado de **solo-estudio**: deja de mantenerse (sin más
  _pull requests_, _issues_ ni actualizaciones). Para uso real se recomienda el MCP oficial
  de VTEX (`@vtex/developer-mcp`): https://www.vtex.com/en-us/vtex-vision/developer-mcp
- Mensaje de _deprecation_ en npm actualizado para apuntar al MCP oficial de VTEX.

### Añadido
- Sección **MCP oficial de VTEX** en el README, con la ilustración oficial del VTEX AI
  Developer Toolkit.
- Estandarización del README (badges de badgen, contenido en español).
- Archivo `LICENSE` (MIT) y este `CHANGELOG`.

## [0.1.2] - 2026-06-04

### Añadido
- Versión inicial del proyecto.
