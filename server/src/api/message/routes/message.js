module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/messages',
            handler: 'message.find',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/messages',
            handler: 'message.create',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        // Add routes for your custom methods
        {
            method: 'GET',
            path: '/messages/recent',
            handler: 'message.getRecentMessages',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/messages/create',
            handler: 'message.createMessage',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};