
FROM docker.elastic.co/logstash/logstash:7.4.2

RUN rm -f /usr/share/logstash/pipeline/logstash.conf

ADD pipeline/ /usr/share/logstash/pipeline/
ADD config/ /usr/share/logstash/config/

COPY --chown=logstash:root mysql-connector-java-8.0.18.jar /usr/share/logstash/logstash-core/lib/jars/mysql-connector-java.jar

RUN logstash-plugin install logstash-input-jdbc
