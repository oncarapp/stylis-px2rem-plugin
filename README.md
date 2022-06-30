# stylis-px2rem-plugin

A [Stylis](https://github.com/thysultan/stylis) 4.x plugin that translates pixel units to rem units.


## Installation

With npm

```
$ npm install stylis-px2rem-plugin
```

With yarn

```
$ yarn add stylis-px2rem-plugin
```

## Options

```ts
{
  remSize?: number
  allowList?: string[]
  blockList?: string[]
} | undefined
```


### Default

Transforms all px units to rem units on a 16:1 basis.

#### Example

```css
stylisPx2RemPlugin()

font-size: 12px;
height: 64px;

... becomes ...

font-size: 0.75rem;
height: 8rem;
```

### `remSize`

Changes the conversion basis of how many px units per rem unit.

#### Example

```css
stylisPx2RemPlugin({ remSize: 10 })

font-size: 12px;
height: 64px;

... becomes ...

font-size: 1.2rem;
height: 6.4rem;
```

### `allowList`

Only convert CSS properties in the allowlist.

#### Example

```css
stylisPx2RemPlugin({ allowList: ['font-size'] })

font-size: 12px;
height: 64px;

... becomes ...

font-size: 0.75rem;
height: 64px;
```

### `blockList`

Changes the conversion basis of how many px units per rem unit.

#### Example

```css
stylisPx2RemPlugin({ blockList: ['font-size'] })

font-size: 12px;
height: 64px;

... becomes ...

font-size: 12px;
height: 8rem;
```

## Using with emotion/cache
```jsx
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import stylisPx2RemPlugin from 'stylis-px2rem-plugin'

const myCache = createCache({
  key: 'your-key',
  stylisPlugins: [stylisPx2RemPlugin()],
})

render(
  <CacheProvider value={myCache}>
  	...
  </CacheProvider>
)
```

## Aknowledgements

Our thanks go out to [stylis-pxtorem](https://github.com/AWare/stylis-pxtorem) and [stylis-rtl](https://github.com/FindHotel/stylis-rtl) for inspiration when developing this plugin.
