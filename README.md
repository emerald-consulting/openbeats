![openbeats_notype-45](https://user-images.githubusercontent.com/31867784/132925211-2aabc8a7-a06d-4354-99c0-56886400227c.png)


## Description

**Open Beats**, is a Digital Audio Workstation (DAW) that aims to allow artists to collaborate with others on music synchronously and remotely. 

The project is currently beginning development for [Jesse Hartloff's CSE 442 class](https://cse442.com/) for the Fall 2021 semester at the University at Buffalo, as well as Alan Hunt's CSE 611 Masters Project Development class for the Fall 2021 semester at the University at Buffalo.

**This repository** contains the code for a social media application that bundles with the [Digital Audio Workstation, Open Beats](https://github.com/emerald-consulting/openbeats-daw). The goal is to allow musical artists who have produced songs on Open Beats to upload, listen and share their songs with others, as well as stream music from various streaming services. 

## Prerequisites


### Tech Stack
* [React](https://reactjs.org/)
    * [Typescript Tutorial ](https://www.udemy.com/course/typescript-the-complete-developers-guide/)
    * [React Tutorial](https://reactjs.org/docs/hello-world.html)
    * [React Youtube Tutorial](https://www.youtube.com/watch?v=I6ypD7qv3Z8)
* [Django](https://docs.djangoproject.com/en/3.2/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/install/)
    * [Docker Tutorial - Udemy - Very good](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/)
    * [Dockerizing React App](https://mherman.org/blog/dockerizing-a-react-app/)
    * [Dockerizing Django and Postgres](https://docs.docker.com/samples/django/)
* [PostgreSQL](https://www.postgresql.org/)
* [Tailwind CSS](https://tailwindcss.com/docs)




# Steps for setting up the environment

## First time

1. Go to your terminal or git bash and run the command ```git clone git@github.com:emerald-consulting/openbeats.git```

2. Navigate to the openbeats root folder using ```cd openbeats```

3. Run the ```docker-compose up --build``` command

4. In a separate terminal window, run the command ```docker exec -it api python manage.py migrate``` to make database migrations

## 

1. Navigate to your terminal or git bash script and navigate to the openbeats directory

2. Run the ```docker-compose up --build``` command

## Authors

Contributors names and contact info

* [Ryan Dils](ryandils@buffalo.edu)
* [Kyle Alberry](kalberry@buffalo.edu)
* [Jordan Bailey](bailey8@buffalo.edu)
* [Priya Sonawane](priyason@buffalo.edu)
* [Michael Focacci](mcfocacc@buffalo.edu)


## Version History

The project is broken up into 4 sprints: 
* Sprint 1 – Week of Sep. 27th ✔️
* Sprint 2 – Week of Oct. 18th 
* Sprint 3 – Week of Nov. 8th
* Sprint 4 – Week of Dec. 6th

We will be doing production releases (merging develop into main) at the end of each sprint.

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [Logic Pro](https://www.apple.com/logic-pro/)
* [Google Docs](https://docs.google.com/)
* [GitHub](https://www.github.com)
