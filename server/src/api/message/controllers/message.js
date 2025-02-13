// @ts-nocheck
"use strict";
/**
 * message controller
*/

const { factories } = require('@strapi/strapi');
const { createCoreController } = factories;

const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
    MISSING_FIELDS: 'Content and sender are required',
    SERVER_ERROR: 'An error occurred while processing your request',
};

module.exports = createCoreController('api::message.message', ({ strapi }) => ({
    ...createCoreController('api::message.message'),

    // Custom method to get recent messages
    async getRecentMessages(ctx) {
        try {
            const messages = await strapi.entityService.findMany('api::message.message', {
                sort: { createdAt: 'desc' },
                limit: 50,
                populate: ['sender'],
            });

            ctx.body = messages.reverse();
            ctx.status = STATUS_CODES.SUCCESS;
        } catch (err) {
            handleError(ctx, err);
        }
    },

    async createMessage(ctx) {
        try {
            const { content, sender } = ctx.request.body;

            if (!content || !sender) {
                ctx.status = STATUS_CODES.BAD_REQUEST;
                return ctx.body = { error: ERROR_MESSAGES.MISSING_FIELDS };
            }

            const message = await strapi.entityService.create('api::message.message', {
                data: {
                    content,
                    sender,
                    publishedAt: new Date(),
                },
            });

            console.log('Message created:', message);

            strapi.io.emit('message', message);

            ctx.status = STATUS_CODES.CREATED;
            ctx.body = message;
        } catch (err) {
            handleError(ctx, err);
        }
    },
}));

// function to handle errors
const handleError = (ctx, error) => {
    console.error('Error:', error);
    ctx.status = STATUS_CODES.SERVER_ERROR;
    ctx.body = { error: ERROR_MESSAGES.SERVER_ERROR };
};