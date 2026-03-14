# VTEX Components Icon

Elementary accessible component to display `svg` icons.
It renders a `svg` element.

## Usage

- Decorative only

```jsx
import Icon from '.*/Icon'

function UseCase() {
  return (
    <Icon>
      <path />
    </Icon>
  )
}
```

- Grant a11y for standalone usage

```jsx
import Icon from '.*/Icon'

function UseCase() {
 return (
   <Icon title="Meaningful name">
     <path />
   </Icon>
 )
}
```

## Types

| prop    | type        | description           | required | default     |
| ------- | ----------- | --------------------- | -------- | ----------- |
| size    | number      | Icon height and width | no       | 24          |
| title   | string      | Icon title            | no       | -           |
| sx      | SxStyleProp | ThemeUI Style prop    | no       | {}          |
| viewBox | string      | Same as `svg` viewBox | no       | '0 0 24 24' |

## Customization

Use `sx` to styling the icon.
For further reading, you can check the Theme Documentation.
