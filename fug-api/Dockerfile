FROM node:12.13-alpine As development

WORKDIR /app

COPY fug-api/package*.json /app/

RUN npm install

COPY ./fug-api /app/

RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY fug-api/package*.json /app/

RUN npm install --only=production

COPY ./fug-api /app/

# Copy Data Folder
COPY --from=development /app/dist ./dist
COPY --from=development /app/src/data ./dist/data

CMD ["node", "dist/main"]