# lys-docs-theme

The theme, site configuration and Pages workflow every lys documentation
site shares, so the family looks the same and a change lands in one place.

## Use it

`docs/package.json`, pinned to a commit of this repository:

```json
{
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
  },
  "devDependencies": {
    "lys-docs-theme": "github:stubbedev/lys-docs-theme#<commit>",
    "vitepress": "^1.6.3"
  }
}
```

`docs/.vitepress/theme/index.js`:

```js
export { default } from 'lys-docs-theme/theme'
```

`docs/.vitepress/config.js`:

```js
import { lysConfig } from 'lys-docs-theme/config'

export default lysConfig({
  name: 'lys-example',
  description: 'One sentence.',
  nav: [{ text: 'Guide', link: '/guide/getting-started' }],
  sidebar: [{ text: 'Guide', items: [{ text: 'Getting started', link: '/guide/getting-started' }] }],
})
```

`branch` defaults to `main`. Any other VitePress site option passes through.
The logo is `docs/public/<name>.svg`.

`.github/workflows/docs.yml`:

```yaml
name: docs
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: docs
  cancel-in-progress: true
jobs:
  pages:
    uses: stubbedev/lys-docs-theme/.github/workflows/pages.yml@<commit>
```

Pass `with: { nix-prebuild: <command> }` to run a command in the repository's
`nix develop` shell before the build, such as generating screenshots.

A new family member goes in the `family` list in `config.js`.
