# VTEX Components Tooltip

Elementary tooltip component that can be reused by all VTEX Styleguides.
You can use reakit full features (except the 'as' prop) and theme-ui's sx.
It renders a tooltip element by default.

> This is a styled base component, so any system can theme it. To customize this component, you just need to add the `tooltip` variant in your theme (check the theming section).

## Usage

```jsx
import Tooltip from 'tooltip'

function UseCase() {
  return (
    <Tooltip label="Tooltip text here">
      <button>Children</button>
    </Tooltip>
  )
}
```

### With arrow

If you want your tooltip to have an arrow, you can pass it to the tooltip as a prop. On the following example,
it's shown how you can use the Reakit [Reakit TooltipArrow](https://reakit.io/docs/tooltip/#tooltiparrow) with the tooltip, but you can design any arrow you want.
The tooltip state is passed to the arrow, so you can access the placement and visibility of the tooltip.

```js
import Tooltip from '@vtex-components/tooltip'
import { TooltipArrow } from 'reakit'

function Arrow(props) {
  return <TooltipArrow {...props} />
}

function TooltipExample() {
  return (
    <Tooltip label="Tooltip label" placement="top" arrow={<Arrow />}>
      <button>Children component</button>
    </Tooltip>
  )
}
```

## Theming

| Modifier | Description |
| -------- | ----------- |
| styles   | base styles |

### Example

You can define the theme with:

```js
const theme = {
  tooltip: {
    backgroundColor: 'black',
    color: 'white',
    paddingY: 1,
    paddingX: 2,
  },
}
```

## Props

| prop      | type        | description                                              | default | required |
| --------- | ----------- | -------------------------------------------------------- | ------- | -------- |
| children  | ReactNode   | Element that triggers the tooltip                        | -       | yes      |
| label     | String      | Text shown in the tooltip                                | -       | yes      |
| arrow     | ReactNode   | Arrow element, if you want your tooltip to have an arrow | -       | no       |
| placement | Placement   | The placement of the tooltip relative to its children    | top     | no       |
| visible   | boolean     | Whether the tooltip is visible or not                    | -       | no       |
| sx        | SxStyleProp | Theme-ui style prop                                      | -       | no       |
