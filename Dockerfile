FROM node:6 as build

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile \
  && yarn build

FROM busybox:1

COPY --from=build /app/dist /usr/src/osem/dist
COPY run.sh /usr/local/bin/run.sh

CMD ["run.sh"]
