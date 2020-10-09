FROM node:12 as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:alpine
COPY --from=build /app/dist/out/ /usr/share/nginx/html
