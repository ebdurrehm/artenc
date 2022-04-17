#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$YOUR_ID" ] && echo "Missing \$CONTRACT environment variable" && exit 1


echo
echo 'update specific article with its all data url, sender and title'
echo near view \$CONTRACT getArticles
echo
echo \$CONTRACT is $CONTRACT
echo \$YOUR_ID is $YOUR_ID
echo

near call $CONTRACT updateArticle '{"id":"<change it>","title":"<change it>", "url":"<change it>"}' --accountId $YOUR_ID


exit 0