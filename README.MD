## Hypercore CLI example
This small example supports two functionalities:
- getting the complete list of images with a timeout in between
- getting a single image

### Getting a single image
Example: 
```
$ ./bin/cli.js --single yourfavoriteindex --api-url http://your-api-url
```

### Getting all images
Example:
```
./bin/cli.js --timeout 2000 --all --api-url http://your-api-url
```

For each functionality you can also use Hypercore by passing `hypercore-key` as parameter e.g.:
```
$ ./bin/cli.js --timeout 2000 --all --hypercore-key 73c5032a1d659438a7386f9c1137d173c680676e155c2b7dd51bf60f41de507d
```

