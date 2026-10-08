#!/bin/sh
set -eu

jq -n \
  --arg apiBaseUrl "${PUBLIC_API_BASE_URL:-/api}" \
  --arg oidcAuthority "${PUBLIC_OIDC_AUTHORITY:-}" \
  --arg oidcClientId "${PUBLIC_OIDC_CLIENT_ID:-}" \
  '{apiBaseUrl: $apiBaseUrl, oidcAuthority: $oidcAuthority, oidcClientId: $oidcClientId}' \
  > /usr/share/nginx/html/runtime-config.json
