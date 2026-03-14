# AI Documentation Reviewer Action

A GitHub Action that analyzes documentation using Google Gemini AI to provide intelligent feedback and validation for documentation based on predefined types and rules.

## Features
- Categorizes docs into predefined types: Guide, Tutorial, Reference, API Reference, Explanation, Release Note
- Validates against type-specific rules and guidelines
- Provides detailed feedback on structure, content, and VTEX standards adherence
- Uses Google Gemini AI for analysis

## Usage

```yaml
- name: Review Documentation
  uses: vtexdocs/ai-reviewer-action@v1
  with:
    gemini_api_key: ${{ secrets.GEMINI_API_KEY }}
    file_paths: 'test.md'
```

## Inputs
| Input | Description | Required |
|-------|-------------|----------|
| `gemini_api_key` | Google Gemini API key | Yes |
| `file_paths` | Path to the documentation file | Yes |

## Output
1. General Feedback: Overall summary of findings
2. Actionable Feedback: Specific areas requiring changes
3. Suggested Revision: Improved version of document or sections

## Customization
- Add doc types in `config/documentation_types.json`
- Map types to rules in `config/rules_mapping.json`
- Create rules files in `rules/` folder with sections: metadata, frontmatter, body, style_guide
