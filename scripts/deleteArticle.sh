#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$AUTHOR ] && echo "Missing \$CONTRACT environment variable" && exit 1


echo
echo 'deleting articles of the writer'
echo near call  \$CONTRACT sendNearToWriter  --accountId \$OWNER
echo
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER
echo \$AUTHOR is $AUTHOR

echo

near call  $CONTRACT deleteArticle '{"owner":"'$AUTHOR'"}' --accountId $OWNER

exit 0
