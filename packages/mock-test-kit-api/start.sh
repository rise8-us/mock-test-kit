#!/usr/bin/env sh

if [ "$WATCH" = "true" ]; then
  HEADERS=${HEADERS:-default false} yarn watch
else
  HEADERS=${HEADERS:=default false} yarn start
fi
