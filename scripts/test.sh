#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Testacular Server (https://github.com/karma-runner/karma)"
echo "-------------------------------------------------------------------"

karma start $BASE_DIR/../config/testacular.conf.js $*
