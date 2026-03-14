---
title: 'Data formats'
source: vtexdocs/content-portal-content
slugEN: data-formats
locale: en
---

Formatting data consistently creates a clean, organized, and accessible experience.

## Country names

For country names, follow https://countrycode.org/.

| Do | Don't |
| ---- | ---- |
| US, United States | USA, United States of America |

## Locales

Use a two-letter lowercase language subtag and a two-letter uppercase country subtag separated by a hyphen (IETF BCP 47 standard).

| Do | Don't |
| ---- | ---- |
| en-US, en-GB | En-US, EN |

## Numbers

Use comma as the thousand separator and period as the decimal separator.

| Do | Don't |
| ---- | ---- |
| 1,230 | 1.230 |
| 9.5 | 9,5 |

When referring to empty values, use "No [items] to show" or a dash (`-`). Don't use "0" or "None" for empty states.

Use large number abbreviations when space is a constraint: 60K, 60M, 60B, 60T.

## Percentages

Use `%` when expressing a percentage itself. Use `p.p.` (percentage points) when expressing the difference between two percentages.

| Do | Don't |
| ---- | ---- |
| 85% | 85 % |
| 85.31% | 85.315 % |
| 0.56 p.p. vs. yesterday | 0.56p.p. vs. yesterday |

## Currency

Use the country code when prioritizing clarity; use the currency symbol in contexts that require more usability.

- Do not add space between the symbol and value: `$50 USD`
- Use a period as a decimal separator in currency values.
- Use comma (`,`) as the thousand separator: `$1,000`

## Date and time

The US date format is Month Day, Year: `January 1, 2020`, `Friday, December 21, 2029`.

Use MM/DD/YYYY in forms and ranges.

Use 12-hour clock abbreviations in uppercase with no period: `10:00 PM` (not `10 p.m.`).

When an event or action happens based on a specific local time, include the city and UTC zone: `10:30 AM São Paulo (GMT-3)`.

For time remaining, use `00d 00h 00m 00s`. For elapsed time, use `x time word ago` (example: `2 days ago`).

## Units of measurement

Add a space between the number and the unit: `1.9 lb`, `25 cm`, `7 kg`.

Never use plural in unit of measurement abbreviations: `7 lb` (not `7 lbs`).

Always use miles as the measure for distance.

For pricing by measurement, never add a space before or after a slash: `$50/m`.

Always use numerals and units when writing quantities: `5 in`, `15 m` (not "five inches", "fifteen meters").

## Ranges

Always use en dash between ranges.

| Do | Don't |
| ---- | ---- |
| 1 – 30 search results | 1 - 30 search results |

## Documentation numbers

If a number is under 10, spell it out (one, two, three, etc.). If it's over (and including) 10, write it using digits (example: 43, 775), except when the number doesn't refer to a specific value.

## Phone numbers

Use `(xxx) xxx-xxxx` format for local US context and `+1 (xxx) xxx-xxxx` for international context.
