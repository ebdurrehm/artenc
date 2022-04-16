#!/usr/bin/env bash

[ -z "$NEAR_ENV" ] && echo "Missing \$NEAR_ENV environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1


# exit on first error after this point
set -e

echo --------------------------------------------
echo
echo "rebuilding the contract (release build)"
echo
yarn build:release

echo --------------------------------------------
echo
echo "creating a subaccount under $OWNER"
echo
near create-account artenc.$OWNER --masterAccount=$OWNER --initialBalance "6"

echo --------------------------------------------
echo
echo "deploying and initializing the contract in a single transaction"
echo
near deploy --accountId=artenc.$OWNER --wasmFile=./build/release/artenc.wasm --initFunction 'init' --initArgs '{"owner":"'$OWNER'"}'

exit 0
