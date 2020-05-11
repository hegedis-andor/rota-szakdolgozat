FROM nginx:1.16.1-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY /www /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'