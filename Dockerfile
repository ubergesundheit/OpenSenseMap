FROM digitallyseamless/nodejs-bower-grunt:0.10

COPY . /data

RUN npm install && bower install

CMD ["grunt", "serve"]
