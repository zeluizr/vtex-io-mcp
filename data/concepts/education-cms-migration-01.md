# Issue: CMS Legacy to Store Framework Migration - Production Impacts and Rollback

| Field | Value |
|-------|--------|
| **issue_id** | cms-migration-01 |
| **persona** | Developer |
| **product** | VTEX Store Framework / CMS |
| **user_intent** | Understand the production environment impacts and rollback possibilities when migrating a store from CMS Legacy to Store Framework |
| **expected_doc_url** | https://developers.vtex.com/docs/guides/vtex-io-documentation-migrating-storefront-from-legacy-to-io |
| **surface** | developers-portal |

---

## Queries by path

### A — External search (Google)

| locale | style | query |
|--------|-------|-------|
| en | naive | How to migrate my VTEX online store without breaking it and how to undo if something goes wrong |
| en | familiar | VTEX CMS Legacy to Store Framework migration production impact and rollback |
| en | expert | VTEX Store Framework migration production deployment strategy rollback procedures CMS Legacy |

### B — Internal search (Algolia / Proprietary API)

| locale | style | query |
|--------|-------|-------|
| en | naive | migrate store safely undo changes |
| en | familiar | Store Framework migration production rollback |
| en | expert | CMS Legacy Store Framework migration rollback |

### C — Docs assistant API (MCP-backed)

| locale | style | query |
|--------|-------|-------|
| en | naive | How do I move my store to the new system without problems and what if I need to go back |
| en | familiar | What are the risks when migrating from CMS Legacy to Store Framework and can I rollback |
| en | expert | What are the production impacts and rollback possibilities when migrating from CMS Legacy to Store Framework |

### D — External LLMs

| locale | style | query |
|--------|-------|-------|
| en | naive | I need to upgrade my VTEX store to a new version. What happens to my live site and can I reverse it if needed? |
| en | familiar | What are the production environment impacts when migrating a VTEX store from CMS Legacy to Store Framework? What are my rollback options? |
| en | expert | What are the production environment impacts and rollback possibilities in the process of migrating a VTEX store from CMS Legacy to Store Framework? |

## Document Context

This issue addresses critical concerns for store owners and technical teams planning a migration from CMS Legacy to Store Framework.

### Production Impacts:
- Workspace-based development (no downtime during development)
- A/B testing capabilities for gradual rollout
- URL structure changes and SEO considerations
- Performance characteristics differences
- Custom functionality migration requirements
- Third-party integrations reconfiguration
- Analytics and tracking migration

### Rollback Possibilities:
- Pre-production rollback (workspace level - immediate)
- During A/B testing rollback (traffic routing - minutes)
- Post-migration rollback (binding switch - hours/days)
- Best practices for maintaining rollback readiness
- Risk mitigation strategies

### Migration Strategy:
- Isolated workspace development
- Comprehensive QA testing
- Gradual traffic rollout
- Monitoring and alerting setup
- Clear rollback procedures and decision criteria
