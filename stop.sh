#!/bin/bash

# Rimozione di tutti i pod, deployment, service e persistent volume
kubectl delete -f db-deployment.yaml
kubectl delete -f db-api-deployment.yaml
kubectl delete -f website-deployment.yaml
kubectl delete -f db-service.yaml
kubectl delete -f db-api-service.yaml
kubectl delete -f website-service.yaml
kubectl delete -f progetto2-my-network-networkpolicy.yaml
kubectl delete -f my-volume-persistentvolumeclaim.yaml
