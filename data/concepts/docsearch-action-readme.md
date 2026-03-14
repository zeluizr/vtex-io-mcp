# Algolia Docsearch Action

GitHub Action that runs the docsearch scraper and updates an Algolia index for the VTEX Dev Portal.

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| `algolia_application_id` | Yes | Algolia docsearch `APPLICATION_ID` |
| `algolia_api_key` | Yes | Algolia docsearch `API_KEY` |
| `file` | Yes | Location of the scraper config (mdx or openapi config) |

## Example usage

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    name: Scraper mdx files running
    steps:
    - uses: actions/checkout@v2
    - uses: vtexdocs/devportal-docsearch-action@main
      with:
        algolia_application_id: 'XXXXXXXXX'
        algolia_api_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx123'
        file: './configs/scraper_md.json'
```
