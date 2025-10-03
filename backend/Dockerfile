ARG TARGET_STAGE=dev

# Use the official Python runtime image
FROM python:3.13-slim AS base

# Set up environment to avoid creating virtual environments
ENV UV_SYSTEM_PYTHON=1
ENV UV_PROJECT_ENVIRONMENT=/usr/local

# Install curl and uv, then clean up apt cache
RUN apt-get update \
  && apt-get install -y curl \
  && rm -rf /var/lib/apt/lists/* \ 
  && curl -LsSf https://astral.sh/uv/install.sh | env UV_INSTALL_DIR="/usr/local/bin" sh

# Set the working directory inside the container
WORKDIR /app
COPY pyproject.toml uv.lock ./

FROM base AS dev
RUN uv sync --frozen

FROM base AS prod
RUN uv sync --frozen --no-dev

FROM $TARGET_STAGE AS final
# # Copy the Django project to the container
COPY . .env /app/

# Run Django’s development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
