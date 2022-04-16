#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$AUTHOR" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$NEAR" ] && echo "Missing \$CONTRACT environment variable" && exit 1


echo
echo 'Initilaizing the contract'
echo near call \$CONTRACT init '{"owner":"abdur23.testnet"}' --accountId \$OWNER
echo
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER

echo

near call \$CONTRACT init '{"owner":"'\$OWNER'"}' --accountId \$OWNER

exit 0