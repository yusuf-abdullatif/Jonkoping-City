# Web-Advanced
 
Draft readme, to be adjusted later when project is done 
Rest,
node.js,
Docker,
Database: Postgres
Kubernetes


#Command codes


node index.js

docker build -t yusuf .

docker tag yusuf localhost:5000/yusuf

docker push localhost:5000/yusuf

kubectl port-forward svc/yusuf-service 3000:3000-n jkpgcity