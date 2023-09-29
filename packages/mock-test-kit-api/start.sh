#!/usr/bin/env sh

if [ "$WATCH" = "true" ]; then
  ADDRESS=0.0.0.0 HEADERS=${HEADERS:-default false} yarn watch
else
  ADDRESS=0.0.0.0 HEADERS=${HEADERS:=default false} yarn start
fi
