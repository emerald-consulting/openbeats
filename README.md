![openbeats_notype-45](https://user-images.githubusercontent.com/31867784/132925211-2aabc8a7-a06d-4354-99c0-56886400227c.png)


## Description

**Open Beats**, is a Digital Audio Workstation (DAW) that aims to allow artists to collaborate with others on music synchronously and remotely. The project is currently beginning development for [Jesse Hartloff's CSE 442 class](https://cse442.com/) for the Fall 2021 semester at the University at Buffalo.

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

* How/where to download your program
* Any modifications needed to be made to files/folders

### Executing program

* How to run the program
* Step-by-step bullets
```
code blocks for commands
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

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

* [Ryan Dils](ryandils@buffalo.edu)
* [Kyle Alberry](kalberry@buffalo.edu)
* [Jordan Bailey](bailey8@buffalo.edu)
* [Priya Sonawane](priyason@buffalo.edu)
* [Michael Focacci](mcfocacc@buffalo.edu)


## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)
