#!/usr/bin/env sh

my_dir="$(dirname "$0")"

# switch to kib project
oc project u210645-pieni

# remove everything from kib
oc delete all -l app=pieni-poc-dev
