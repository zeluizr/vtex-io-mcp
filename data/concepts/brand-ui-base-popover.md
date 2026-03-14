# VTEX Components Popover

Elementary popover component that can be reused by all VTEX Styleguides.
You can use reakit full features (except the 'as' prop) and theme-ui's sx.
It renders a popover element by default.

> This is a styled base component, so any system can theme it. To customize this component, you just need to add the `popover` variant in your theme (check the theming section).

## Usage

```jsx
import { Popover, usePopoverState } from '.*/BasePopover'

function UseCase() {
  const popover = usePopoverState()

  return (
    <Popover
      {...popover}
      disclosure={<button>Open popover</button>}
    >
      <p>This is a Popover</p>
    </Popover>
  )
}
```

### With arrow

If you want your popover to have an arrow, you can pass it to the popover as a prop. On the following example,
it's shown how you can use the Reakit [Reakit PopoverArrow](https://reakit.io/docs/popover/#popoverarrow) with the popover, but you can design any arrow you want.
The popover state is passed to the arrow, so you can access the placement and visibility of the popover.

## Theming

| Modifier | Description         |
| -------- | ------------------- |
| styles   | base styles         |

### Example

You can define the theme with:

```js
const theme = {
  popover: {
    backgroundColor: 'white',
    padding: 3,
  },
}
```

## Props

| prop       | type        | description                                              | default | required |
| ---------- | ----------- | -------------------------------------------------------- | ------- | -------- |
| children   | ReactNode   | Popover content element                                  | -       | yes      |
| disclosure | ReactNode   | Element that triggers the popover                        | -       | yes      |
| placement  | Placement   | The placement of the popover relative to its children    | top     | no       |
| arrow      | ReactNode   | Arrow element, if you want your popover to have an arrow | -       | no       |
| visible    | boolean     | Whether the popover is visible or not                    | -       | no       |
| sx         | SxStyleProp | Theme-ui style prop                                      | -       | no       |

PopoverSize = `'small'` | `'regular'`

Placement = `"auto-start" | "auto" | "auto-end" | "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-end" | "bottom" | "bottom-start" | "left-end" | "left" | "left-start"`
