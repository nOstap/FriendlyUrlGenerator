FROM node:12 as build
WORKDIR /app
COPY fug/package*.json /app/
RUN npm install
COPY ./fug /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:alpine
COPY --from=build /app/dist/out/ /usr/share/nginx/html
