<p style="color: red">Docker compose doesn't have reverse proxy yet, start apps individually please.</p>

```js
// create and start containers
docker-compose up
// start services with detached mode
docker-compose -d up
// start service
docker-compose start
// stop services
docker-compose stop
// display running containers
docker-compose top
// kill services
docker-compose kill
// remove stopped containers
docker-compose rm
// stop all containers and remove images, volumes
docker-compose down
```