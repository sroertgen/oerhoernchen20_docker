
FROM docker.elastic.co/logstash/logstash:7.4.2

RUN rm -f /usr/share/logstash/pipeline/logstash.conf

COPY pipeline/ /usr/share/logstash/pipeline/
COPY config/ /usr/share/logstash/config/
COPY mappings/ /usr/share/logstash/templates/

COPY --chown=logstash:root mysql-connector-java-8.0.18.jar /usr/share/logstash/logstash-core/lib/jars/mysql-connector-java.jar

RUN logstash-plugin install logstash-input-jdbc

# HEALTHCHECK CMD "curl --fail http://elasticsearch:9200/ -H 'Content-Type: application/json' -H 'Authorization: Basic ZWxhc3RpYzpjaGFuZ2V0aGlzaW5wcm9kdWN0aW9u' || exit 1"