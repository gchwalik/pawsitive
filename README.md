# Pawsitive

Pawsitive is an application that helps dog walkers and owners find safe locations for their reactive dogs.

Reactive dogs generally have similar triggers - children, other dogs, loud noises - and Pawsitive aggregates notes about which locations have which triggers and when they might occur.

**Note: the frontend and backend folders have their own readmes with expanded information.**

## How to launch the app 

The app is currently made of two servers, a frontend server built with React and Node, and a backend server build with Python and Django. 

Launching the application is very straightforward:
1. From the `pawsitive/backend/` folder run `make run`
    1. The backend server is launched at `localhost:8000`, and this endpoint exposes Django Rest Framework's GUI.
2. From the `pawsitive/frontend/` folder run `make run`
    1. The frontend server is launched at `localhost:5173`. Accessing this in your brower will show you the pawsitive webpage.

## Development

Our code is wrapped up in docker containers. This is so that we all develop in the same environments, we can deploy using IaC (infra as code), etc.

This does have impact on our development though, as to successfully manipulate and debug the environments we need to frequently work inside the containers themselves.

See the sub-folder specific READMEs for tools used and recommended dev workflow.

### Dependencies

These should be the only dependencies required to launch the app, as it's wrapped in docker:
- docker
- make

Please make an issue to update this doc if any dependencies are missing.

### PRD

Find the PRD in the `/docs/` folder.

### Data Models

You can see the versioned data models in `/docs/data_models`. There are further notes in `/docs/README.md`.
