# Phase 1: Testing — VTEX Education Documentation Infrastructure

| Field | Value |
|:------|:------|
| Created | Feb 3, 2026 |
| Champion | Pedro Antunes Costa |
| Duration | 6 weeks |
| Parent | KR 1 — Documentation infrastructure for content discoverability |

This document plans the **testing phase** of KR 1: building a test suite that measures how well users find VTEX knowledge across all discovery paths, then running a baseline before improvements.

---

## 1. Purpose and scope

**Goal:** Establish a repeatable way to measure search/knowledge-finding effectiveness across every path users use to find VTEX docs. Run a baseline so we can prioritise improvements and compare before/after.

**In scope:** Knowledge-finding paths (see below). We start with issues + queries → build a method to run tests → define and apply success metrics → produce a baseline report.

**Out of scope:** Implementing search improvements; full automation in CI.

---

## 2. Knowledge-finding paths and query types

| Query type | Paths that use it | Description |
|------------|-------------------|-------------|
| **External search (Google)** | Google Search | Organic web search; users land on Help Center or Developer Portal via Google. |
| **Internal search (Algolia/Proprietary API)** | Portal search, Proprietary search API | On-site search (e.g. Algolia) on Help Center and/or Developer Portal. |
| **Docs assistant API (MCP-backed)** | Docs assistant API | API experience that uses the VTEX docs MCP under the hood. |
| **External LLMs** | External LLMs | ChatGPT, Claude, etc. using web search/browsing. |

**Why 4 query types:** Tech writers fill one query array per type (external, internal, docs assistant API, external LLMs). The *wording* varies by type so we avoid sharing the same queries across paths that expect different phrasing.

---

## 3. Issue and query collection

### 3.1 Personas

| Persona | Description | Target share |
|---------|-------------|--------------|
| **Store operator** | Admin panel tasks, catalog management, payment method setup, inventory management | 40% |
| **Developer** | Storefront customization, Backoffice integration, APIs | 40% |
| **Decision maker** | Checking platform capabilities, security, compliance | 20% |

### 3.2 Where issues come from

Tech writers propose **user issues** (problems or intents) within their product scope. Sources:

- **Documentation analytics:** Most viewed docs, search logs, high exit rates, Google search console.
- **Product knowledge:** Known pain points, stakeholder insights, complex or high-risk features.

### 3.3 Process

1. **Scope:** Four tech writers, each specializing in 1–2 products. Each TW contributes **5–8 issues** (~20–32 issues total). Target persona mix: ~40% Store operator, ~40% Developer, ~20% Decision maker.
2. **Template:** For each issue, tech writers fill: Issue ID, Persona, Product/vertical, User intent, Expected outcome (Doc URL), Source.
3. **Queries per query type:** For each issue we need exactly **one query of each style per query type**: one **naive**, one **familiar**, one **expert**. So each query type's array has exactly 3 entries per issue.

Query **styles:**
- **naive** — Plain-language goal or problem; no product jargon (e.g. "checkout without saving customer profile").
- **familiar** — Some product/domain terms; not the exact feature name (e.g. "guest checkout VTEX").
- **expert** — Official or canonical phrasing; close to doc/feature name (e.g. "how to enable guest checkout").

---

## 4. Test execution

We run tests **in parallel by path**: each of the four team members owns 1–2 knowledge-finding paths.

| Path | Description |
|------|-------------|
| Google Search | Programmatic search (no site restriction) |
| Portal search + Proprietary search API | Call Algolia API or internal search API |
| Docs assistant API | Call docs-assistant API with query; capture returned doc refs |
| External LLMs | Manual or semi-automated via OpenRouter/OpenAI/Anthropic APIs |

### Output format (unified)

Store results in a simple, path-agnostic format so we can compute metrics the same way for every path:

```json
{
  "run_id": "baseline-2026-02",
  "results": [
    {
      "issue_id": "P1-01",
      "path": "portal",
      "query": "configure Y",
      "query_style": "expert",
      "top_results": [
        { "rank": 1, "url": "https://...", "title": "..." }
      ]
    }
  ]
}
```

---

## 5. Success measurement

- **Primary metric:** For each (issue, path), **pass** = expected doc appears in **top K** results (e.g. top 3 or top 5). **Fail** = it does not.
- **Aggregate:** pass rate per path, per persona, per query style, and overall.
- **Baseline report:** Table/chart with pass rate per path, per persona, and overall; list of failing (issue_id, path, query) for prioritising improvements.

---

## 6. Timeline (6 weeks)

| Phase | Duration | Focus |
|-------|----------|--------|
| Issues + queries | 2 weeks | Collect and consolidate |
| Building the tests | 2 weeks | Runners (parallel by path) |
| Running the tests | 1 week | Baseline run |
| Review + mapping gaps | 1 week | Handoff |

---

## 7. Deliverables

| Deliverable | Description |
|-------------|-------------|
| **Test suite artifact** | Structured list of issues + queries + expected outcomes |
| **Runners** | Scripts or flows to run queries on all knowledge-finding paths |
| **Baseline results** | Raw results (JSON) for the first full run |
| **Baseline report** | Pass rate per path and overall; list of failing (issue, path, query) |
| **Recommendations** | Prioritised improvement ideas based on failure patterns |

---

## 8. Localization

- **Developers Portal:** EN only
- **Help Center:** PT, EN, ES
- Each issue must declare where it is expected to be solved (surface + locale).
- Runners iterate by locale where supported.
- Report by locale and globally.
