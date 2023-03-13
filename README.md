# Build team, test application
iOS, macOS, .NET, Java applications framework dependent, name of the dependencies and their versions stored in the solution, project files.

## Run Locally

Clone the project

```bash
  git clone https://github.com/s1tnik/express-typescript
```

Go to the project directory

```bash
  cd express-typescript
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run build && npm run dev
```

## Docker

Build a Docker image using the Dockerfile. Run this command in the same directory as your Dockerfile:

```bash
  docker build -t your-image-name .
```

Build a Docker image using the Dockerfile. Run this command in the same directory as your Dockerfile:

```bash
  docker run -p 5072:5072 your-image-name
```

This will start a container and map port 5072 from the container to port 5072 on your host machine.

You can now access your application by visiting http://localhost:5072 in a web browser.

Note: You might need to update the CMD in your Dockerfile to run your application correctly within the Docker container.
