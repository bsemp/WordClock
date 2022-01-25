# Word Clock

A clock that gives time with words (French, English)

## Local

```bash
# export NODE_PORT=3000  # Configure server port
yarn start
```

## Docker

```bash
docker build --tag wordclock:latest .
docker run --rm --env NODE_PORT=3000 -p 3000:3000 wordclock:latest
```

## Application

Open your browser to <https://localhost:3000>

![clock image](./docs/images/clock.png)
