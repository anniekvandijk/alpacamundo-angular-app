FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY ./dist/alpacamundo-angular-app .

ENV PORT=80
EXPOSE ${PORT}

ENTRYPOINT ["nginx", "-g", "daemon off;"]