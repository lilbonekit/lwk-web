#!/usr/bin/env bash

set -e

LWK_REF=${1:-jade-serial-improvements}
LWK_COMMIT=${2}

docker build \
  --build-arg LWK_REF="$LWK_REF" \
  --build-arg LWK_COMMIT="$LWK_COMMIT" \
  -t lwk-builder .

docker rm -f lwk-tmp 2>/dev/null || true

docker create --name lwk-tmp lwk-builder

docker cp lwk-tmp:/tmp/lwk/lwk_wasm/pkg_web/. .

docker rm -f lwk-tmp

echo "LWK wasm updated"