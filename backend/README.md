# Backend for Bakery Website

## Guide

Make sure you have [Docker](https://www.docker.com/) installed as well as the Docker app!

Run the Docker app and then from the root:
```
make backend
```

Site should now be active

Database is not implemented yet

## App

* routes/*: contains routes to the home and products page
* main.py: FastAPI
* settings.py: environment variables using pydantic

## Database

* db.py: database initialization
* models.py: database models
* schemas.py: database schemas


