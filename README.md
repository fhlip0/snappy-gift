# snappy-gift

Static joke gift-picker page for GitHub Pages.

Custom domain: `snappy.fhlipzero.io`

Nothing on the page submits, tracks, or fulfills an order.

## Cloudflare DNS

Add this record, then wait for GitHub Pages to issue TLS.

- Type: `CNAME`
- Name: `snappy` (zone `fhlipzero.io`)
- Target: `fhlip0.github.io`
- Proxy: DNS only (grey cloud)

GitHub Pages is enabled from the `main` branch root.
