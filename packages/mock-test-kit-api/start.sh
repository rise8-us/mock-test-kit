#!/usr/bin/env sh

if [ "$WATCH" = "true" ]; then
  yarn watch
else
  yarn start
fi
