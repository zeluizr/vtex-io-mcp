# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y este proyecto sigue el [Versionado Semántico](https://semver.org/lang/es/).

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
