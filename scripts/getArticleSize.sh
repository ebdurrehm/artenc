#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1



echo
echo 'getting the number of the articles on the storage'
echo near view \$CONTRACT getArticleSize
echo
echo \$CONTRACT is $CONTRACT
echo

near view \$CONTRACT  getArticleSize


exit 0