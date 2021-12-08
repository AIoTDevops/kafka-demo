# kafka-demo

## start kafka

```
docker-compose rm -svf
docker-compose up

```

## create kafka topic

```
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
    --create \
    --zookeeper zookeeper:2181 \
    --replication-factor 1 \
    --partitions 1 \
    --topic test

```

