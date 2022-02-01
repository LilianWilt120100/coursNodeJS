# DEMO IUT

## Variables d'environnement

- ./services/.env

## Commandes utiles

- Installer les dépendances 
`docker-compose run <nom_service> npm i`

- Entrer dans le container :
`docker exec -ti <nom_service> bash`

- Check API (le service doit être en fonctionnement) :
`curl -i localhost:3333`

- Supprimer container :
``docker rm <id_container>`