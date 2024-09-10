#!/bin/sh

HOST=$1
shift
CMD="$@"

until nc -z -v -w30 $HOST; do
  >&2 echo "Waiting for $HOST..."
  sleep 1
done

>&2 echo "$HOST is up - executing command"
exec $CMD
