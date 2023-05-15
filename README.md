# VNCC-Project

This repository contains a Docker Compose configuration to set up a development environment for an application that manages a list of products of interest and tracks expenses. The configuration is defined in the `docker-compose.yml` file.

## Prerequisites

Before running the Docker Compose configuration, ensure that you have Docker installed on your machine.

- Docker: [Install Docker](https://docs.docker.com/get-docker/)

## Getting Started

To start the development environment, follow these steps:

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/your-username/repository.git
   ```

2. Navigate to the cloned repository:

   ```
   cd repository
   ```

3. Open the `docker-compose.yml` file in a text editor and customize the environment variables as needed. By default, the following variables are set:

   - `POSTGRES_USER`: simone
   - `POSTGRES_PASSWORD`: password
   - `POSTGRES_DATABASE`: db

4. Build and start the services using Docker Compose:

   ```
   docker-compose up -d
   ```

   This command will create and start the PostgreSQL database, the database API, and the website containers.

5. Once the containers are running, you can access the services as follows:

   - PostgreSQL database: `localhost:5432`
   - Database API: `localhost:5000`
   - Website: `localhost:5001`

## Configuration

The `docker-compose.yml` file defines three services:

1. **db**: This service represents a PostgreSQL database container. It is built from the `./database` directory and configured with the following environment variables:
   - `POSTGRES_USER`: The username for the database (default: simone)
   - `POSTGRES_PASSWORD`: The password for the database (default: password)
   - `POSTGRES_DATABASE`: The name of the database (default: db)
   The database container is accessible on port 5432, and a health check is performed to ensure its availability. The health check command (`pg_isready -U simone`) verifies if the database is ready to accept connections.

2. **db_api**: This service represents a database API container. It is built from the `./db-api` directory and depends on the `db` service. The API container is accessible on port 5000.

3. **website**: This service represents a website container. It is built from the `./website` directory and depends on both the `db` and `db_api` services. The website container is accessible on port 5001.

The services are connected to a common network named `my_network`, which uses the `bridge` driver.

## Additional Information

- The `volumes` section in the `docker-compose.yml` file defines a volume named `my_volume` that is used to persist the data of the PostgreSQL database.
- The `restart: always` configuration ensures that the containers automatically restart if they encounter any issues.
- The `depends_on` configuration specifies the service dependencies. The `db_api` service depends on the `db` service, and the `website` service depends on both the `db` and `db_api` services.
- The health check feature is enabled for the `db` service. The health check command `pg_isready -U simone` checks if the PostgreSQL database is ready to accept connections. The health check runs every 5 seconds (`interval: 5s`), with a timeout of 5 seconds (`timeout: 5s`), and allows 5 retries (`retries: 5`).


## Deploying to Kubernetes

To deploy the application to Kubernetes, you need to have Kubernetes installed on your system. If you haven't installed Kubernetes yet, follow these steps:

1. Install Kubernetes by following the instructions at [kubernetes.io](https://kubernetes.io/docs/setup/).

2. Once you have Kubernetes installed, you can proceed with the deployment process using the Kompose tool to convert the Docker Compose configuration into Kubernetes YAML files. Follow these steps:

   1. Install Kompose by following the instructions at [www.kompose.io](https://www.kompose.io/).

   2. After installing Kompose, navigate to the repository directory.

   3. Run the following command to convert the Docker Compose configuration to Kubernetes YAML files:

      ```
      kompose convert
      ```

      This command will generate the necessary YAML files for deploying the application to Kubernetes.

   4. Customize the generated YAML files if needed.


By following these steps, you can deploy the application to Kubernetes and take advantage of its powerful orchestration capabilities.
Once you have made the necessary modifications, you can deploy the application to Kubernetes using the following scripts.

### Scripts for Running and Stopping the Project

`run.sh` is a script that can be used to easily start the project. It handles the necessary steps to start the application and configure any required dependencies. To use the `run.sh` script, follow these steps:

1. Make sure you have all the prerequisites installed, including Docker and Kubernetes.

2. Open a terminal or command prompt.

3. Navigate to the project directory.

4. Run the following command:

   ```
   ./run.sh
   ```

   This command will execute the script and start the project.

- `stop.sh` is a script that can be used to stop the running project. It gracefully shuts down the application and cleans up any resources. To use the `stop.sh` script, follow these steps:

1. Open a terminal or command prompt.

2. Navigate to the project directory.

3. Run the following command:

   ```
   ./stop.sh
   ```

   This command will execute the script and stop the running project.

Using these scripts can simplify the process of starting and stopping the project, allowing for easier management and development.
