OpenSenseMap
============

## Installation

Go to the cloned repository and run

```
npm install
bower install
```

Now you are good to go and start up the server

```
grunt serve
```

Alternatively, you can use a webserver like nginx and point the web root to the /app folder:

```
server {
        root /var/www/OpenSenseMap/app;
        index index.html;
        location / {
                try_files $uri $uri/ /index.html;
        }

}
```

## Docker based development

- install Docker (and docker-compose)
- with docker-compose: run `docker-compose up` inside the cloned git repository
- without docker-compose:
  - build a Docker image from the cloned repository: `docker build -t osem-dev-env .`
  - run the image: `docker run --rm -it -v $(pwd):/data -p 9000:9000 osem-dev-env grunt serve`
- if you changed either `package.json` or `bower.json`
  - with docker-compose: `docker-compose run osem npm install` or `docker-compose run osem bower install`
  - without docker-compose:
    - `docker run --rm -it -v $(pwd):/data -p 9000:9000 osem-dev-env npm install`
    - `docker run --rm -it -v $(pwd):/data -p 9000:9000 osem-dev-env bower install`
  - or you can rebuild

Code license: MIT License
