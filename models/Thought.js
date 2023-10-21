const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction'); // Pull in the 'Reaction' schema for the 'reactions' array.

// Schema to create Thought model:
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('YYYY-MM-DD [at] hh:mm a'), // Format date inside
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction] // Array of nested documents created with the 'reactionSchema'
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

// Getter method to format the timestamp on query:
// schema.path('createdAt').get(function (timestamp) {
//     return moment(timestamp).format('YYYY-MM-DD');
// });

// Virtual that retrieves the length of the thought's 'reactions' array on query:
thoughtSchema.virtual('reactionSchema').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
