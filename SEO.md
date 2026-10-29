# SEO and domain configuration

`site.config.json` is the single place to update the public deployment URL and Vite base path.

The current `deploymentUrl` is the real GitHub Pages URL and is used for the current sitemap, robots reference, and social sharing URLs. `productionUrl` is deliberately empty, so the temporary GitHub Pages address is **not** emitted as a canonical URL. After choosing the permanent domain, set both `deploymentUrl` and `productionUrl` to its HTTPS origin (for example, `https://www.example.co.za`) and set `basePath` to `/` before the Afrihost build. Do not keep the example domain; it is documentation only.

The Afrihost Apache host must serve the generated `.htaccess` from `public/`. It rewrites the four client-side routes to `index.html` and uses the generated `404.html` for unknown routes. GitHub Pages continues to use its own `404.html` SPA fallback from the Actions workflow.

After switching domains, deploy the new build over HTTPS and submit the new `sitemap.xml` in Google Search Console. Domain/DNS and Search Console configuration are manual hosting tasks.
