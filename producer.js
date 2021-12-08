import Kafka from 'node-rdkafka';
import eventType from 'eventType.js';

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, {
    topic: 'test'
});

stream.on('error', (err) => {
    console.error('Error in our kafka stream');
    console.error(err);
});

function queueRandomMessage() {
    const category = getRandomEvent();
    const message = getRandomMessage(category);
    const event = { category, message };
    const success = stream.write(eventType.toBuffer(event));
    if (success) {
        console.log(`message queued (${JSON.stringify(event)})`);
    } else {
        console.log('Too many messages in the queue already..');
    }
}

function getRandomEvent() {
    const categories = ['Up', 'Down'];
    return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomMessage(category) {
    if (category === 'Up') {
        return "Up event happened";
    } else if (category === 'Down') {
        return "Down event happened";
    } else {
        return 'something happened';
    }
}

setInterval(() => {
    queueRandomMessage();
}, 3000);