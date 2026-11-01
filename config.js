import { defineConfig } from 'vitepress'

const owner = 'stubbedev'

export const family = [
  { name: 'lys-shell', blurb: 'Desktop shell' },
  { name: 'lys-wm', blurb: 'Compositor' },
  { name: 'lys-ui', blurb: 'Widget toolkit' },
  { name: 'lys-lib', blurb: 'Building blocks' },
  { name: 'lys-login', blurb: 'Display manager and lock screen' },
  { name: 'lys-splash', blurb: 'Boot splash' },
  { name: 'lys-polkit', blurb: 'Polkit agent' },
  { name: 'lys-secrets', blurb: 'Secret Service' },
]

const familyNav = (name) => ({
  text: 'lys',
  items: family.map((repo) => ({
    text: `${repo.name}: ${repo.blurb}`,
    link: repo.name === name ? '/' : `https://${owner}.github.io/${repo.name}/`,
    target: '_self',
  })),
})

export function lysConfig({ name, description, branch = 'main', nav = [], sidebar, ...site }) {
  if (!family.some((repo) => repo.name === name)) {
    throw new Error(`lys-docs-theme: ${name} is not in the family list`)
  }
  const repo = `https://github.com/${owner}/${name}`
  return defineConfig({
    title: name,
    description,
    base: `/${name}/`,
    cleanUrls: true,
    lastUpdated: true,
    srcExclude: ['node_modules/**'],
    head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `/${name}/${name}.svg` }]],
    markdown: { theme: { light: 'github-light', dark: 'tokyo-night' } },
    vite: { ssr: { noExternal: ['lys-docs-theme'] } },
    themeConfig: {
      logo: `/${name}.svg`,
      nav: [...nav, familyNav(name)],
      sidebar,
      socialLinks: [{ icon: 'github', link: repo }],
      footer: {
        message: 'Released under the MIT License.',
        copyright: `Copyright 2026 ${name} contributors`,
      },
      editLink: { pattern: `${repo}/edit/${branch}/docs/:path`, text: 'Edit this page on GitHub' },
      outline: { level: [2, 3] },
      search: { provider: 'local' },
    },
    ...site,
  })
}
