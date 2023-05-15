#!/bin/bash

# Creazione delle immagini
docker build -t k8sdb ./database
docker build -t k8sapi ./db-api
docker build -t k8swebsite ./website

# Rimozione di tutti i pod, deployment e service
kubectl delete pod --all
kubectl delete deployment --all
kubectl delete service --all

# Applicazione dei file YAML
kubectl apply -f my-volume-persistentvolumeclaim.yaml
kubectl apply -f progetto2-my-network-networkpolicy.yaml

kubectl apply -f db-deployment.yaml
kubectl apply -f db-api-deployment.yaml
kubectl apply -f website-deployment.yaml

kubectl apply -f db-service.yaml
kubectl apply -f db-api-service.yaml
kubectl apply -f website-service.yaml

# Sleep per dare il tempo ai pod di avviarsi
sleep 7

# Port forwarding
kubectl port-forward service/db-api 5000:5000 &

sleep 2

kubectl port-forward service/website 5001:5001
