# Project: JustStreamIt  

Menu  

1. Présentation  
2. Technologies  
3. Installation  

## 1 - Présentation  

Projet de site web permettant de visualiser les films intéressants à partir d'une base de données composée de plus de 80.000 films issue de l'IMDb (Internet Movie Database / IMDb.com).  
  
Le site web affiche en haut de la page le meilleur film, le mieux noté de la base de données.  
  
Puis 4 carousels, possédant chacun un titre, se succèdent horizontalement, ils comprennent chacun 7 films, mais ils n'en montrent frontalement que 4. Il faut faire défiler les films grâce aux boutons situés sur les côtés de chaque carousel.  
  
Le premier carousel présente les 7 meilleurs films de la base de données, succédant au meilleur film montré en haut de la page.  
  
Les 3 carousels suivant présentent les meilleurs films de catégories choisies au hasard.  
  
Enfin, lorsque vous cliquez sur n'importe laquelle des affiches de film présentes à l'écran, une fenêtre modale s'ouvre et présente en détail le film choisi.  
  
## 2 - Technologies  

Markup language: HTML  
Styling language: CSS  
Programming language: vanilla Javascript  

API: OCMovies-API, Django Rest Framework  

## 3 - Installation  

### Installation de l'API  

rendez-vous à l'adresse suivante et procédez à l'installation comme il est indiqué dans le readme:  

[https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git]
  
### Site web

Le fonctionnement du site a été, comme demandé, vérifié sur les 3 navigateurs les plus utilisés:  

- Chrome,
- Safari,
- Firefox

2 solutions s'offrent à vous, dans tous les cas vérifiez bien que vous avez bien installé l'API et lancé le serveur:

#### Solution 1 (Chrome, Safari, Firefox)

clonez ce repository où vous le souhaitez:

```cli
git clone https://github.com/RafaRemote/just_stream_it.git
```
  
Ensuite, avec le naviguateur de votre choix, ouvrir le fichier 'index.html' qui se trouve dans le dossier que vous venez de créer en clonant ce repository.

#### Solution 2 (Chrome et Firefox)

Rendez-vous simplement à cette adresse:  
  
[https://rafaremote.github.io/just_stream_it/]  
