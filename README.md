Lisa's application to Plusgrade; a marginal tax rate calculator.

## Getting Started

This project is bootstrapped using Nextjs.

1. Install dependencies
2. Make sure you're using an appropriate node version. I'm using 20.11.0
3. To run the front end, use `npm run dev`. It will be available at localhost:3000
4. To run the API, download the docker image and run it
   `docker pull ptsdocker16/interview-test-server`
   `docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server`

## Context

I used Nextjs because it plays well with Tailwind and with Docker, and is easy to get up and running.

## Possible To-dos

- localize
- custom dropdown
- add tailwind base classes (ex h1-h6)
- more tests

## Features

- loading state (submit CTA)
- error handling
- responsiveness (table scroll)
- memoized complex functions (tax rate table)
