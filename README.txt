Setup

Requires:
- postgresql
- node.js and npm
- Angular 6+ (and the Angular CLI)
- Python 3

1. Clone this repository
2. Create a Python 3 virtual environment, activate, and `pip install -r requirements.txt`
3. Create a postgre database with the following commands in the postgre shell (accessed with `psql` in the command line):
    CREATE DATABASE authtest;
    CREATE USER django WITH PASSWORD 'djangoauthtest';
    ALTER ROLE django SET client_encoding TO 'utf8';
    ALTER ROLE django SET default_transaction_isolation TO 'read committed';
    ALTER ROLE django SET timezone TO 'UTC';
    GRANT ALL PRIVELEGES ON DATABASE authtest TO django;
    (Use `\q` to exit the shell)
4. `manage.py migrate` to initialize the database
5. `manage.py createsuperuser` to set up your admin user
6. Start the dev servers with `manage.py runserver` and `ng serve`. The site will be available at http://localhost:4200

This repository also has a guestbook branch which adds a simple
Guestbook to the site to demonstrate create and read operations
using the JWT authentication.

1. `git checkout guestbook`
2. `manage.py migrate`
3. You may need to restart the dev servers, though they might notice the changes on checkout and handle it themselves.
