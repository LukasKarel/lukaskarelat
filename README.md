# Caddy Template


# Docker Compose deployments

I have created multiple ``docker-compose.yml`` files for different deployments. To merge multiple files for local development use for example:
``docker compose -f docker-compose.yml -f docker-compose-local.yml [COMMAND]``

## Required Environment Variables

Here is a list of all required environment variables for a deployment. Use a ``.env`` file for easy local development.
```bash
LISTMONK_DB_USERNAME=
LISTMONK_DB_PASSWORD=
LISTMONK_DB_HOST=
LISTMONK_DB_SSL_MODE=


NEWSLETTER_LISTMONK_USERNAME=
NEWSLETTER_LISTMONK_PASSWORD=
NEWSLETTER_TOKEN_SECRET=
NEWSLETTER_ALLOWED_CORS=
```

Copyright © 2025 Lukas Karel. All rights reserved.
