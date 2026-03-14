# Brand UI Textarea

A `Textarea` is an edition control for a text box, and works when the user wants to write a large text in a free format.

## Detailed design

| prop       | type      | description                                                  | required |
| ---------- | --------- | ------------------------------------------------------------ | -------- |
| value      | string    | value associated with the text area                          | yes      |
| helperText | string    | additional tips on how the TextArea is expected to be filled | yes      |
| label      | string    | label displayed in the TextArea, also used as placeholder    | yes      |
| onChange   | function  | the function that handles changes on the textarea value      | yes      |
| rows       | number    | The number of lines of text visible to the control           | no       |
| cols       | number    | The visible width of the text area, in average char widths   | no       |
| charLimit  | number    | maximum number of characters in TextArea text                | no       |
| disabled   | boolean   | whether the TextArea is disabled or not                      | no       |
| readOnly   | boolean   | whether the TextArea is read only or not                     | no       |
| error      | boolean   | whether the TextArea is error state or not                   | no       |
| darkmode   | boolean   | whether the TextArea is in darkmode state or not             | no       |

## Usage

### Basic usage

```jsx
import { Textarea } from '@brand-ui/TextArea'

;<Textarea
  label="Please enter your feedbacks here.."
  helperText="Help Message"
  value={value}
  onChange={onChange}
  cols={3}
  rows={5}
/>
```
