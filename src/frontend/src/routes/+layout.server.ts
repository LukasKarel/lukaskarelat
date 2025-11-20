export const prerender = true;

// required with static-adapter otherwise /route/index.html is not generated.
// static-adapter would generate /route.html and this does not work
// with hosting with caddy
export const trailingSlash = 'always';
