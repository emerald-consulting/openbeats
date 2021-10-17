#!/bin/sh

set -e

# echo KUBECONFIG in a kubeconfig file for helm to authenticate with
echo "$KUBECONFIG" > kubeconfig-file

# point to our file from above
export KUBECONFIG=kubeconfig-file

# run the `command` specified in github
sh -c "helm $*"
