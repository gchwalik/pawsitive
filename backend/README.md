# Pawsitive

Pawsitive is an application that helps dog walkers and owners find safe locations for their reactive dogs.

Reactive dogs generally have similar triggers - children, other dogs, loud noises - and Pawsitive aggregates notes about which locations have which triggers and when they might occur.

## Dependencies

Because the project is wrapped in Docker, all you need to launch the backend server is:

- docker
- make

Because all the code is built and runs in the container, your IDE will probably tell you that you don't have needed packages installed in the backend code. If this bothers you, you can resolve it with `poetry install --no-root`.

## Changes

NOTE: The db is out of sync with the migrations. I rolled back 0002 and 0003 to cleanup some broken functionality in the frontend.

