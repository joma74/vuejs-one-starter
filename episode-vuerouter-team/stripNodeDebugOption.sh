#!/usr/bin/env bash
set -x
ndo=$NODE_DEBUG_OPTION;
ndo=($ndo);
ndo=${ndo[0]};
NODE_DEBUG_OPTION=$ndo;
NODE_DEBUG_OPTION="${NODE_DEBUG_OPTION//debug/inspect}"
set +x
echo $NODE_DEBUG_OPTION;
