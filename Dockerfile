# Use the official Python runtime image
FROM python:3.13-slim

# TODO: fix this poetry install - it's super awkward

# Set up Poetry environment
ENV POETRY_HOME="/opt/poetry"
ENV PATH="${POETRY_HOME}/bin:$PATH"
ENV POETRY_VIRTUALENVS_CREATE=false

# Install Poetry
RUN apt-get update && apt-get install -y curl \
  && curl -sSL https://install.python-poetry.org | python3 - \
  && apt-get remove -y curl \
  && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app
COPY pyproject.toml poetry.lock ./

# run this command to install all dependencies 
RUN poetry install --no-root
 
# Copy the Django project to the container
COPY . /app/
 
# Expose the Django port
EXPOSE 8000
 
# CMD ["sleep", "1000"]
# Run Django’s development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:${PORT}"]
