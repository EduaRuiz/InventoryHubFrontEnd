#!/bin/sh

if [ -n "$HOST_3000" ]; then
  sed -i "s/localhost:3000/$HOST_3000/g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$HOST_3001" ]; then
  sed -i "s/localhost:3001/$HOST_3001/g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$HOST_3002" ]; then
  sed -i "s/localhost:3002/$HOST_3002/g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$HOST_3003" ]; then
  sed -i "s/localhost:3003/$HOST_3003/g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$HOST_81" ]; then
  sed -i "s/localhost:81/$HOST_81/g" /usr/share/nginx/html/assets/env.js
fi

nginx -g "daemon off;"
