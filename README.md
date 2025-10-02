# Pawsitive

Pawsitive is an application that helps dog walkers and owners find safe locations for their reactive dogs.

Reactive dogs generally have similar triggers - children, other dogs, loud noises - and Pawsitive aggregates notes about which locations have which triggers and when they might occur.

## Dependencies

These should be the only dependencies required to launch the app, as it's wrapped in docker:
- docker
- make

Please make an issue to update this doc if I have any dependencies missing.

## How to launch the app 

The app is currently made of two servers, a frontend server built with React and Node, and a backend server build with Python and Django. 

Launching the application is very straightforward:
1. From the `pawsitive/backend/` folder run `make run`
    1. The backend server is launched at `localhost:8000`, and this endpoint exposes Django Rest Framework's GUI.
2. From the `pawsitive/frontend/` folder run `make run`
    1. The frontend server is launched at `localhost:5173`. Accessing this in your brower will show you the pawsitive webpage.

## Development Process

We're wrapping our code in docker containers. This so that we all develop in the same environments, we can deploy using IaC (infra as code), etc.

This does have impact on our development though, as to successfully manipulate and debug the environments we need to frequently work inside the containers themselves.

I detail here some of the dev process to keep in mind.

**Note: the frontend and backend folders have their own readmes with expanded information.**

### Passing the pipeline

PRs require that the pipeline passes green to merge to main. This requires: a successful build, successful linting, and passing tests.

Prior to merging your branch commits in you'll want to make sure linting is passing with `make lint`, tests are running with `make test` (which isn't implemented yet, but will be soon).
- If `make lint` fails, run `make fmt` to format your code, and fix any remaining issues surfaced through `make lint`.
- You should always run `make lint` and `make test` (once tests are implemented) before committing your code.

If you want to edit packages, investigate build issues, ets, you'll run `make run` to start up the container, then in a different terminal `make exec` to drop into the container, and then make the changes/run the commands that you need.

## Docs

Note that both the frontend and backend folders have their own more-specific readmes.

### PRD

Find the PRD in the `/docs/` folder.

### Data Models

You can see the versioned data models in `/docs/data_models`. There are further notes in `/docs/README.md`.
