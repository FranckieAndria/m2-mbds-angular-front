# Lancer le projet en Local

## Backend API nodejs
- Clonez le repository GitHub : [Repository backend](https://github.com/FranckieAndria/m2-mbds-angular-back.git)
- Accédez au dossier `m2-mbds-angular-back`
- Installez les dépendances définies dans le fichier `package.json` en éxecutant la commande :
```
npm build
```
- Démarrez l'application en éxecutant la commande : 
```
npm start
```
- L'application backend est maintenant lancée :tada: , API accèssible à l'adresse [http://localhost:8010](http://localhost:8010) 

## Frontend ANGULAR
- Clonez le repository GitHub : [Resitory frontend](https://github.com/FranckieAndria/m2-mbds-angular-front.git)
- Accédez au dossier `m2-mbds-angular-front`
- Installez les dépendances définies dans le fichier `package.json` en éxecutant la commande :
```
npm install
```
- Effectuez un build (compilation et construction) du projet, cette commande est **optionnelle** :
```
ng build
```
- Démarrez l'application en éxecutant la commande :
```
ng serve
```
- L'application Angular est maintenant démarrée :tada: , accèssible depuis votre navigateur à l'adresse [http://localhost:4000](http://localhost:4000) <br>
> [!NOTE]
> Si vous souhaitez utiliser l'API de votre application local :
> - Ouvrez le fichier `src/environnement/environnement.ts`
> - Remplacez la valeur de l'attribut `baseUrl` par `http://localhost:8010/api` 

# Informations utiles
Pour vous connecter, vous pouvez voir ci-dessous la liste des creditentials
- Voici de quoi vous connecter en tant qu'étudiant : [Creditentials etudiants](https://github.com/FranckieAndria/m2-mbds-angular-front/tree/master/creditentials/etudiant.md)
- Si vous souhaitez vous connecter en tant que professeur : [Creditentials professeurs](https://github.com/FranckieAndria/m2-mbds-angular-front/tree/master/creditentials/professeur.md)
- Et utilisez ces uniques accès en tant qu'administrateur : [Creditential administrateur](https://github.com/FranckieAndria/m2-mbds-angular-front/tree/master/creditentials/administrateur.md) <br>
> [!TIP]
> **Sauf pour l'administrateur**, l'adresse mail et le mot de passe utilise le **prénom de l'utilisateur**, exemple `meson@gmail.com` comme adresse mail a pour mot de passe `mesonPass`
> - Toutes les adresses mails se terminent par `@gmail.com`
> - Tous les mots de passe se terminent par `Pass` (sauf administrateur)
<br><br>
> Bien sûr, sauf si vous avez déjà modifié ses valeurs depuis **la partie administrateur** :wink:

# Contributions au projet

## ANDRIAMALALA Franckie Antonnio
**Gestion de login/password**
- Authentification à l'aide de `JSON Web Tokens (JWT)`
- Gestion des rôles et autorisations des utilisateurs
- Gestion des utilisateurs dans MongoDB

**Mise en place des templates**
- Mise en page du menu avec `mat-sidenav` et `mat-icon`
- Implémentation de la barre de navigation utilisant `mat-toolbar` 

**[ETUDIANT] Enregistrement d'un assignment**
- Utilisation d'un formulaire de type Stepper (en plusieurs étapes) avec `mat-stepper`
- Contôle des champs pour chaque étape et messages de notification utilisant `MatSnackBar`
- Partitionnement de la page utilisant `mat-grid-list`
- Proposition d'un choix fixe de matières et association automatique au professeur

**[ETUDIANT] Relevé des notes**
- Liste des assignments rendus et notés avec infos professeurs et matièress
- `Exportation PDF` des notes obtenus

**[ETUDIANT] Recherche avancée**
- Formulaire pour enregistrer les contraintes de recherches
- Utilisation de `matDatepicker` pour le format et contrainte des dates
- Pagination des résultats de recherche avec sauvegarde des contraintes

**[ETUDIANT] Liste des assignments**
- Possibilité de séléctionner que les rendus, les non-rendus ou tous ses assignments
- Possibilité de trier ses assignments selon ses dates de création
- Pagination des résultats utilisant `mat-paginator` et zone de recherche

## RAKOTONAIVO Ambinintsoa

## Contributions communes
**Conception de la base de données et des modèles**
- Création des modèles de collections
- Implémentation des Schémas dans le backend `nodejs` et `mongoose`
- Complétion du fichier `readme`

**Population de la base de données**
- Enregistrement de `1000 Assignments`
- Enregistrement de `20 Etudiants`
- Enregistrement de `05 Professeurs` avec `05 matières`
- Enregistrement de `01 Administrateur`