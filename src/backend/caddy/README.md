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