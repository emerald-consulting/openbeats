![openbeats_notype-45](https://user-images.githubusercontent.com/31867784/132925211-2aabc8a7-a06d-4354-99c0-56886400227c.png)


## Description

**Open Beats**, is a Digital Audio Workstation (DAW) that aims to allow artists to collaborate with others on music synchronously and remotely. The project is currently beginning development for [Jesse Hartloff's CSE 442 class](https://cse442.com/) for the Fall 2021 semester at the University at Buffalo, as well as []() for the Fall 2021 semester at the University at Buffalo.

This repository contains the code for a social media application that bundles with Open Beats. The goal is to allow musical artists who have produced songs on Open Beats to upload, listen and share their songs with others, as well as stream music from various streaming services. 

## Getting Started

### Tech Stack
* [React](https://reactjs.org/)
    * [Typescript Tutorial ](https://www.udemy.com/course/typescript-the-complete-developers-guide/)
    * [React Tutorial](https://reactjs.org/docs/hello-world.html)
    * [React Youtube Tutorial](https://www.youtube.com/watch?v=I6ypD7qv3Z8)
* [Django](https://docs.djangoproject.com/en/3.2/)
* [Docker](https://www.docker.com/)
    * [Docker Tutorial - Udemy - Very good](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/)
    * [Dockerizing React App](https://mherman.org/blog/dockerizing-a-react-app/)
    * [Dockerizing Django and Postgres](https://docs.docker.com/samples/django/)
* [PostgreSQL](https://www.postgresql.org/)
* [Tailwind CSS](https://tailwindcss.com/docs)

    We won't need other libraries or languages because JS/React covers the frontend, and Python/Django covers the backend.
### Installing

* Must have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

### Clone the repository


* Clone the repository using SSH
```
git clone git@github.com:RyChrome/openbeats.git
```

* Clone the repository using HTTPS
```
git clone https://github.com/RyChrome/openbeats.git
```

### Building the project
* Navigate to the repostiory
```
cd openbeats
```

* Build project using docker compose
```
docker-compose up
```

### Creating the database
* Create the initial migration for the User model
```
docker-compose exec api python manage.py makemigrations openbeats
```
* Migrate the database
```
docker-compose exec api python manage.py migrate
```

and then navigate to http://localhost/

## Authors

Contributors names and contact info

* [Ryan Dils](ryandils@buffalo.edu)
* [Kyle Alberry](kalberry@buffalo.edu)
* [Jordan Bailey](bailey8@buffalo.edu)
* [Priya Sonawane](priyason@buffalo.edu)
* [Michael Focacci](mcfocacc@buffalo.edu)


## Version History

The project is broken up into 4 sprints: 
* Sprint 1 – Week of Sep. 27th
* Sprint 2 – Week of Oct. 18th
* Sprint 3 – Week of Nov. 8th
* Sprint 4 – Week of Dec. 6th

We will be doing production releases (merging develop into main) at the end of each sprint.

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)
* [Logic Pro](https://www.apple.com/logic-pro/)
* [Google Docs](https://docs.google.com/)
* [GitHub](https://www.github.com)
