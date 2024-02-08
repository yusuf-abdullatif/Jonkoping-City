Web-Advanced Project Readme
This is a web application project that utilizes modern technologies for its development and deployment. The following tools and technologies are used in this project:

Node.js 
Docker
PostgreSQL database
Kubernetes
To run the application locally, execute the following command in your terminal:

node index.js

To build a Docker image of the application, run the following commands:

docker build -t yusuf .
docker tag yusuf localhost:5000/yusuf
docker push localhost:5000/yusuf

To deploy the application on Kubernetes, run the following command:

kubectl port-forward svc/yusuf-service 3000:3000-n jkpgcity
The application will be accessible at http://localhost:3000.

Database Configuration
The PostgreSQL database is configured with the following settings:

Port: 5432
Env: POSTGRES_PASSWORD=12345
pgAdmin Configuration
pgAdmin is a web-based administration tool for PostgreSQL. It is configured with the following settings:

Port: 8080
Env: PGADMIN_DEFAULT_PASSWORD=12345 PGADMIN_DEFAULT_EMAIL=my@email.com
IP to server
The IP address of the server hosting the PostgreSQL database is 172.17.0.1

License
This project is licensed under the MIT License.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Authors
Yusuf Abdullatif
Subburaman Vengadessane

Acknowledgments
This project utilizes the following open-source libraries and tools:

Express.js
PostgreSQL
Docker
Kubernetes
pgAdmin