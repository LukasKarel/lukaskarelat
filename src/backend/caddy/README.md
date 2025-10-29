# Caddy

This folder contains configuration for the [Caddy Proxy](https://caddyserver.com/).

## Docker

Run caddy from this directory with docker compose
``docker compose up --build``

If you want to reload the config connect into container
``docker exec -it [CONTAINER_ID] /bin/sh``

And to reload use
``caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile``

## Caddyfile Template

I use ``jinja2`` for templating the deployment Caddyfile. So it can be reused for prod/dev and other hosts. 
[Online template renderer](https://j2live.ttl255.com/).

## Required environment variables

```bash
# optional extra domain to redirect www.* domain to HOST_DOMAIN
WWW_HOST_DOMAIN=
# The main domain
HOST_DOMAIN=
# The domain for the hosting of listmonk for users to configure their subscription
LISTMONK_HOST_DOMAIN=

# The base url to the newsletter api to route requests
NEWSLETTER_API_PROXY_HOST=

# The base url to the listmonk api to route requests
LISTMONK_PROXY_HOST=
```