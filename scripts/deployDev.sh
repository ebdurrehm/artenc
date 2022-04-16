#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable"

echo "deleting $CONTRACT"
echo
near delete $CONTRACT

echo --------------------------------------------
echo
echo "cleaning up the /neardev folder"
echo
rm -rf ./neardev

set -e

echo --------------------------------------------
echo
echo "rebuilding the contract (release build)"
echo
yarn build:release

echo --------------------------------------------
echo
echo "redeploying the contract"
echo
near dev-deploy ./build/release/artenc.wasm

echo --------------------------------------------
echo run the following commands
echo
echo 'export CONTRACT=<dev-id>'
echo "near call \$CONTRACT init '{\"owner\":\"'\$OWNER'\"}' --accountId \$CONTRACT"
echo
echo


exit 0

