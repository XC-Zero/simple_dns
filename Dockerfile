FROM nginx:alpine
COPY ./scripts/rname /usr/share/nginx/html/
COPY /dist/ /usr/share/nginx/html/
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

