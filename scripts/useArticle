#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$AUTHOR" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$YOUR_ID" ] && echo "Missing \$CONTRACT environment variable" && exit 1


echo
echo 'get specific article with its all data url, sender and title'
echo near view \$CONTRACT getArticles
echo
echo \$CONTRACT is $CONTRACT
echo \$AUTHOR is $AUTHOR
echo \$YOUR_ID is $YOUR_ID
echo

near call $CONTRACT getArticle '{"owner":"'\$AUTHOR'"}' --accountId \$YOUR_ID


exit 0