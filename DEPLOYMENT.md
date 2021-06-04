# Deployment Configuration

Uses:
* gunicorn

## Before deploying

Make sure STATIC_ROOT and STATIC_URL are set in the settings.

We need to collect static files using: `python manage.py collectstatic`

Make sure that the whitenoise middleware is installed to ensure that valid mime types are corrected in the production server.

Make sure that ALLOWED_HOSTS is set in the settings.

## Running the production server

Run gunicorn server: `gunicorn plasmatech.wsgi`

If you get a 'connection in use' error, consider using command: `sudo fuser -k 8000/tcp` to kill
the process.