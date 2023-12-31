/* eslint-disable no-undef */
// const { ObjectId } = require('bson');

const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dayjs(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

module.exports = reactionSchema;
