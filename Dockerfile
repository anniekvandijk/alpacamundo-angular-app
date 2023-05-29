# #stage 1
# TODO - use multi-stage build without 403 error
# FROM node:latest as appbuild
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod

# Stage 2

FROM nginx:alpine
# ## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY ./dist/alpacamundo-angular-app .
#COPY --from=appbuild /app /usr/share/nginx/html

ENV PORT=80
EXPOSE ${PORT}

ENTRYPOINT ["nginx", "-g", "daemon off;"]