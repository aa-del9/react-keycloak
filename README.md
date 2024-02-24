# React-Keycloak

Simple react app integrated with keycloak authentication.

## Run Locally

### React

(Make sure your keycloak instance is running)

Clone the project

```bash
  https://github.com/aa-del9/react-keycloak
```

Go to the project directory

```bash
  cd react-keycloak
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### Keycloak

You can simply run keycloak on a docker instance using the following command.

```bash
  docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:23.0.6 start-dev

```

This will create a new docker instance (if it doesn't exist already) with default admin id and password.
