FROM nginx:alpine
COPY ./dist/inventory-front/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]

# docker tag front-app eduarandres/front-app:latest
# docker push eduarandres/front-app:latest