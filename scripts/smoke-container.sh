#!/usr/bin/env bash
set -euo pipefail

image_tag="igeos-resto-front-end:check-${GITHUB_RUN_ID:-local}"
docker build -t "$image_tag" .
container_id=$(docker run -d -p 127.0.0.1::8080 \
  -e PUBLIC_API_BASE_URL=/api-test \
  -e PUBLIC_OIDC_AUTHORITY=https://identity.example.org \
  -e 'PUBLIC_OIDC_CLIENT_ID=resto"web' \
  "$image_tag")
trap 'docker rm -f "$container_id" >/dev/null' EXIT
port=$(docker inspect --format '{{(index (index .NetworkSettings.Ports "8080/tcp") 0).HostPort}}' "$container_id")
origin="http://127.0.0.1:$port"

ready=false
for _ in {1..30}; do
  if curl --fail --silent --max-time 2 "$origin/healthz" >/dev/null; then
    ready=true
    break
  fi
  sleep 1
done
if [[ "$ready" != true ]]; then
  docker logs "$container_id"
  echo 'O servidor não ficou disponível no prazo.' >&2
  exit 1
fi

[[ "$(curl --fail --silent --max-time 5 "$origin/healthz")" == ok ]]
curl --fail --silent --max-time 5 "$origin/rota-direta" | grep -q '<div id="root"></div>'
curl --fail --silent --max-time 5 "$origin/runtime-config.json" \
  | jq -e '.apiBaseUrl == "/api-test" and .oidcClientId == "resto\"web" and .oidcAuthority == "https://identity.example.org"' >/dev/null
curl --fail --silent --head --max-time 5 "$origin/runtime-config.json" | grep -qi 'Cache-Control: no-store'
[[ "$(curl --silent --output /dev/null --write-out '%{http_code}' --max-time 5 "$origin/assets/missing.js")" == 404 ]]
echo 'Container: saúde, rota direta, JSON público, cache e asset ausente verificados.'
