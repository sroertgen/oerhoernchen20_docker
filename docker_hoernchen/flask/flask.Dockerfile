FROM python:3.6-slim
RUN apt-get update && apt-get install -y --no-install-recommends curl

WORKDIR /app

ADD . /app

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD [ "app.py" ]