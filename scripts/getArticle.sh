#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1



echo
echo 'getting all of the articles without url property'
echo near view \$CONTRACT getArticles
echo
echo \$CONTRACT is $CONTRACT
echo

near view \$CONTRACT  getArticles


exit 0