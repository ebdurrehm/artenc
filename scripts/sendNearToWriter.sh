#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$CONTRACT environment variable" && exit 1



echo
echo 'SENDING nears  to writers'
echo near call  \$CONTRACT sendNearToWriter  --accountId \$OWNER
echo
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER


echo

near call  \$CONTRACT sendNearToWriter  --accountId \$OWNER

exit 0
