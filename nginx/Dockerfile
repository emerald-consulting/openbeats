FROM nginx

# There is a DEFAULT config file that comes with this image. Overwrite it with ours
COPY ./build /var/www/openbeats
COPY ./default.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'