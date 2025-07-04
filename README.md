# Pawsitive

Pawsitive is an application that helps dog walkers and owners find safe locations for their reactive dogs.

Reactive dogs generally have similar triggers - children, other dogs, loud noises - and Pawsitive aggregates notes about which locations have which triggers and when they might occur.

## Dependencies
- docker
- make

## How to launch the app 

The app is currently made of two servers, a frontend server built with React and Node, and a backend server build with Python and Django. 

Launching the application is very straightforward:
1. From the `pawsitive/backend/` folder run `make run`
    1. The backend server is launched at `localhost:8000`, and this endpoint exposes Django Rest Framework's GUI.
2. From the `pawsitive/frontend/` folder run `make run`
    1. The frontend server is launched at `localhost:5173`. Accessing this in your brower will show you the pawsitive webpage.
