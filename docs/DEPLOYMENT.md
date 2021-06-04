# Build & Deployment Configuration

This describes required steps for deployment.

Note: TLS certificate is described  in DEVOPS.md

## Before deploying: Collect Static files

Make sure STATIC_ROOT and STATIC_URL are set in the settings.

We need to collect static files using: `python manage.py collectstatic`

Make sure that the whitenoise middleware is installed to ensure that valid mime types are corrected in the production server.

Make sure that ALLOWED_HOSTS is set in the settings.

## Quick test: Running the production server

Run gunicorn server: `gunicorn plasmatech.wsgi`

If you get a 'connection in use' error, consider using command: `sudo fuser -k 8000/tcp` to kill
the process.

## Containerisation

Build container: `docker build . -t plasmatech8/plasmatech-webserver`

Push container: `docker push plasmatech8/plasmatech-webserver`

Test container: `docker run -it --rm -p 8080:8080 plasmatech8/plasmatech-webserver`

We can test the overall build process with these commands:
```bash
docker build .. -t plasmatech8/plasmatech-webserver
docker push plasmatech8/plasmatech-webserver
docker run -it --rm -p 8080:8080 plasmatech8/plasmatech-webserver
```

## Kubernetes Deployment

Make sure TLS certificate is valid as per DEVOPS.md.

We can run the command to create/update k8 service/deployments:
```bash
kubectl apply -f plasmatech_service.yaml
kubectl apply -f plasmatech_deployment.yaml
```
