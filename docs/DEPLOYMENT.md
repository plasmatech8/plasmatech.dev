# Build & Deployment Configuration

This describes required steps for deployment.

Note: Other requirements such as TLS certificate is described in `DEVOPS.md`

## Quick test: build & run the production server locally

To run the application locally we first need to:
* Build the front-end React app: `cd frontend && npm run build`
* Collect static files using: `python manage.py collectstatic`

Check that:
* `STATIC_ROOT` and `STATIC_URL` are set in the settings
* `whitenoise` middleware is installed to ensure that valid mime types are corrected in the production server
* `ALLOWED_HOSTS` is set in the settings

Run Django dev server: `python manage.py runserver`

Run Gunicorn prod server: `gunicorn plasmatech.wsgi`

If you get a 'connection in use' error, consider using command: `sudo fuser -k 8000/tcp` to kill
the process.

## Build Docker Image

Build and push container to the DockerHub registry:
```bash
docker build . -t plasmatech8/plasmatech-webserver
docker push plasmatech8/plasmatech-webserver
```

Test the built container container:
```bash
docker run -it --rm -p 8080:8080 plasmatech8/plasmatech-webserver
```

## Kubernetes Deployment

Make sure TLS certificate is valid as per DEVOPS.md.

We can run the command to create/update k8 service/deployments:
```bash
kubectl apply -f scripts/plasmatech_service.yaml
kubectl apply -f scripts/plasmatech_deployment.yaml
```

If you have uploaded a new Docker container, but did not modify the deployment files, you can use:
```bash
kubectl delete pods -l app=plasmatech-webserver
```
