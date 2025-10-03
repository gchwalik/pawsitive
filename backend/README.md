# Pawsitive

Pawsitive is an application that helps dog walkers and owners find safe locations for their reactive dogs.

Reactive dogs generally have similar triggers - children, other dogs, loud noises - and Pawsitive aggregates notes about which locations have which triggers and when they might occur.

## Development

### Dependencies

Because the project is wrapped in Docker, all you need to launch the backend server is:

- docker
- make

Because all the code is built and runs in the container, your IDE will probably tell you that you don't have needed packages installed in the backend code. If this bothers you, you can resolve it with `poetry install --no-root`.

### docker

We're wrapping our code in docker containers. This is so that we all develop in the same environments, we can deploy using IaC (infra as code), etc.

This does have impact on our development though, as to successfully manipulate and debug the environments we need to frequently work inside the containers themselves.

If you want to edit packages, investigate build issues, etc, you'll run `make run` to start up the container, then in a different terminal `make exec` to drop into the container, and then make the changes/run the commands that you need.

I detail here some of the dev process to keep in mind.

### Passing the pipeline

PRs require that the pipeline passes green to merge to main. This requires: a successful build, successful linting, and passing tests.

Prior to merging your branch commits in you'll want to make sure linting is passing with `make lint`, and that tests are running with `make test`.

#### Linting

We use [`ruff`](https://github.com/astral-sh/ruff) as both the linter and formatter.

Linting is static code analysis (it doesn't make changes) used to check for errors, bugs, and stylistic inconsistencies. Formatting actually formats your code to your configured style rules.

You can run `make fmt` to format your code, then `make lint` to surface any remaining issues to manually fix. `make lint` should pass before a pr goes to review.

### Managing packages

We use [`uv`](https://github.com/astral-sh/uv) as the package manager. [Here](https://docs.astral.sh/uv/getting-started/features/#projects) are some useful `uv` commands.

Note that `uv` wants to enforce development within a `venv` virtual environment, which is unnecessary for this project as we're using docker, etc. Make sure that any changes you make with `uv` don't create a virtual environment, as that can mess up this project's infra.

---

Run `make run`, then `make exec` to drop into the container.

Then you can run commands like `uv add [package name]`, etc.

## WARNING

Please do not commit changes to the sqlite3 db, unless it is directly related to updates to the models/etc. This is the out-of-the-box test data.

## Running `django-admin` commands

`python manage.py ..` and `django-admin ..` commands are fairly interchangeable. See their differences in the [Django docs here](https://docs.djangoproject.com/en/5.2/ref/django-admin/).

Because the project is wrapped in docker and doesn't require any local configuration, to successfully run admin commands, such as `makemigrations`, etc, you need to run:
```
$> make run 
```
```
$> make exec
#> python manage.py [command]
```

Note that you need to run `make run` in its own terminal, as it is currently configured to watch and print output about the running server. 

`make exec` drops you into the docker container in a bash shell, allowing you to run commands in the built environment.
