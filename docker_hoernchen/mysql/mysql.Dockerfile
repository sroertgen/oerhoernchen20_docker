FROM mysql:8.0.18

ADD data/all-databases.sql /docker-entrypoint-initdb.d