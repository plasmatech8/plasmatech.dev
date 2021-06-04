FROM node
RUN apt update
RUN apt install python -y
RUN apt install python3-pip -y

COPY . /app
WORKDIR /app
RUN pip3 install -r requirements.txt
RUN cd frontend && npm run build
RUN python3 manage.py collectstatic --no-input

EXPOSE 8080
CMD gunicorn --bind 0.0.0.0:8080 plasmatech.wsgi