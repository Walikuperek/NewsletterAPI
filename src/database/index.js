const SubscriberRepository = require('./subscriber.repository');
const UserRepository = require('./user.repository');

module.exports = {
    Subscriber: SubscriberRepository,
    User: UserRepository
};
