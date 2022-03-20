# Lebonsandwich - WILT Lilian / LP CIASIE 2


## Étapes

### Installer les services

  - `docker-compose run authentification npm i`
  - `docker-compose run commandes npm i`
  - `docker-compose run suivi_commandes npm i`
  - `docker-compose run api_gateway_back npm i`
  - `docker-compose run api_gateway_front npm i`

### DOCKER
- Les commandes de base :
  - `docker-compose pull`
  - `docker-compose up -d`
  - `docker-compose down`
  - `docker-compose up`

### DIRECTUS
- Consulter le catalogue  :
  `http://localhost:8055`

- ID de connexion :
  - mail : admin@example.com
  - password : admin



### COMMANDES
- Consulter les commandes :
  `http://localhost:3335/commandes`


### API GATEWAY BACK OFFICE

- Consulter le suivi de commandes avec authentification :
  `http://localhost:3334/suivi/commandes`

- Token sign up authentification :
  `http://localhost:3334/auth/signup`

- Token sign in authentification :
  `http://localhost:3334/auth/signin`


### API GATEWAY FRONT OFFICE
- Consulter les commandes :
  `http://localhost:3334/commandes`

- Consulter une commande avec son id:
  `http://localhost:3334/commandes/{id}`

- Consulter les items d'une commande avec son id:
  `http://localhost:3334/commandes/{id}/items`

- Consulter les sandwichs :
  `http://localhost:3334/sandwich`

- Consulter les categories :
  `http://localhost:3334/category`

- Consulter une categorie avec son id :
  `http://localhost:3334/category/{id}`

- Ajouter un item dans sandwich (directus) :
  `http://localhost:3334/sandwich`

- Ajouter un item dans category (directus) :
  `http://localhost:3334/category`


### BASE DE DONNÉES
- Consulter la base de données :
  `http://localhost:8080`


### CONNEXION
- Connexion à la base de données :
  - server : sandwich_db
  - username : sandwich_db
  - db : sandwich_db
  - password : sandwich_db




