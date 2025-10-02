# Pawsitive Frontend

This is the Pawsitive frontend code.

It's built using React+Vite.

As mentioned in the project root README, you can launch the frontend dev server simply by running `make run` and then accessing it at `localhost:5173`.

## Development

### Dependencies

Because the project is wrapped in Docker, all you need to launch the frontend server is:

- docker
- make

Because all the code is built and runs in the container, your IDE will probably tell you that you don't have needed packages installed
in the frontend code. If this bothers you, you can resolve it with `npm install`.

### docker

We're wrapping our code in docker containers. This so that we all develop in the same environments, we can deploy using IaC (infra as code), etc.

This does have impact on our development though, as to successfully manipulate and debug the environments we need to frequently work inside the containers themselves.

If you want to edit packages, investigate build issues, ets, you'll run `make run` to start up the container, then in a different terminal `make exec` to drop into the container, and then make the changes/run the commands that you need.

I detail here some of the dev process to keep in mind.

### Passing the pipeline

PRs require that the pipeline passes green to merge to main. This requires: a successful build, successful linting, and passing tests.

Prior to merging your branch commits in you'll want to make sure linting is passing with `make lint`, tests are running with `make test` (which isn't implemented yet, but will be soon).

#### Linting

Linting is validating that your code is formatted well, but doesn't make changes. Formatting actually formats your code to standard styling.

We use `eslint` and `prettier` for linting and formatting. As part of linting we also run `tsc --noEmit` to validate any type errors on compilation, while also not emitting any files/

You can run `make fmt` to format your code, then `make lint` to surface any remaining issues to manually fix. `make lint` should pass before a pr goes to review.

### Managing packages

We use `npm`as the package manager. [Here](https://www.freecodecamp.org/news/npm-cheat-sheet-most-common-commands-and-nvm/) are some useful `npm` commands.

Run `make run`, then `make exec` to drop into the container.

Then you can run commands like `npm install [package name]`, etc.

## Reference links

- https://tailwindcss.com
- https://github.com/alan2207/bulletproof-react
- https://css-tricks.com/snippets/css/a-guide-to-flexbox

## Tools

- background image [unsplash link](https://unsplash.com/photos/a-field-with-yellow-flowers-and-trees-in-the-background-uNxpbV-D8hI)
- git issues color pallette links:
  - issue type: https://coolors.co/palette/fb7d89-bad1c9-85b873-e5db9e-f3a46c-f6bb5d-55abb8
  - P1-P4 red colors: https://coolors.co/palette/ffeaec-ffccd1-ef999c-e57272
  - points: https://coolors.co/palette/d9ed92-b5e48c-99d98c-76c893-52b69a-34a0a4-168aad-1a759f-1e6091-184e77
  - domain area: https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529

# Logo ideas

- Location pin where the "dot" is a paw print
