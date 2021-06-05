# Backend Webserver

The back-end uses:
* Django
* Gunicorn
* Django REST Framework (not used)
* Whitenoise Middleware

The Django server does not utilise the database or the REST framework currently. It only serves a
React SPA.

Build and deployment details are described in `DEPLOYMENT.md`

## To Consider

* Update template to include CSRF token
* Add REST endpoints using Django REST Framework