#!/usr/bin/env bash

#-- Checks for Version ENV Var
if [ "_${PIENI_VERSION}" = "_" ]; then
    echo "Need to set version with export PIENI_VERSION"
    exit 1
fi

#-- list all images
docker images

#-- set the tag
docker tag pieni-poc:latest pieni-poc.docker.bin.sbb.ch/pieni-poc/pieni-poc:${PIENI_VERSION}

#-- list images again, just to be sure
docker images

#-- logging into artifact
docker login pieni-poc.docker.bin.sbb.ch

#-- push the new image to artifactory
docker push pieni-poc.docker.bin.sbb.ch/pieni-poc/pieni-poc:${PIENI_VERSION}

#-- Unset env var pieni_verision
unset PIENI_VERSION