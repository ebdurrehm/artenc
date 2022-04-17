#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$AUTHOR" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$NEAR" ] && echo "Missing \$CONTRACT environment variable" && exit 1


echo
echo 'Adding new article to the storage'
echo near call \$CONTRACT say '{"message":"$1", "anonymous": true}' --account_id \$SPEAKER --amount \$1
echo
echo \$CONTRACT is $CONTRACT
echo \$NEAR is [ $NEAR ] '(attached amount)'

echo

near call  $CONTRACT add '{"url":"http://EXAPMLE.com", "title":"hello world"}' --accountId $AUTHOR --amount $NEAR

exit 0
