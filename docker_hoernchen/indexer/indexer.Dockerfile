FROM python:3.6-slim
RUN apt-get update && apt-get install -y --no-install-recommends curl
WORKDIR /app
ADD . /app
RUN pip install -r requirements.txt

COPY ./dashboards/dashboard.ndjson /app/dashboard.ndjson

ENTRYPOINT [ "python" ]

# HEALTHCHECK CMD "curl --fail http://elasticsearch:9200/ -H 'Content-Type: application/json' -H 'Authorization: Basic ZWxhc3RpYzpjaGFuZ2V0aGlzaW5wcm9kdWN0aW9u' || exit 1"

CMD [ "indexer.py" ]