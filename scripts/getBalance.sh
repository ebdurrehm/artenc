#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1



echo
echo 'getting the current balance of the contract'
echo near view \$CONTRACT getBalance
echo
echo \$CONTRACT is $CONTRACT
echo

near view \$CONTRACT  getBalance


exit 0