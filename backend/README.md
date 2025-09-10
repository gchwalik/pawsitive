# Pawsitive

Pawsitive is an application that helps dog walkers and owners find safe locations for their reactive dogs.

Reactive dogs generally have similar triggers - children, other dogs, loud noises - and Pawsitive aggregates notes about which locations have which triggers and when they might occur.

## Dependencies

Because the project is wrapped in Docker, all you need to launch the backend server is:

- docker
- make

Because all the code is built and runs in the container, your IDE will probably tell you that you don't have needed packages installed in the backend code. If this bothers you, you can resolve it with `poetry install --no-root`.

## Running `django-admin` commands

`python manage.py ..` and `django-admin ..` commands are fairly interchangeable. See their differences in the [docs here](https://docs.djangoproject.com/en/5.2/ref/django-admin/).

Because the project is wrapped in docker and doesn't require any local configuration, to successfully run admin commands, just as `makemigrations`, etc, you need to run:
```
$> make run 
```
```
$> make exec
#> python manage.py [command]
```

Note that you need to run `make run` in its own terminal, as it is currently configured to watch and print output about the running server. 

`make exec` drops you into the docker container in a bash shell, allowing you to run commands in the built environment.
