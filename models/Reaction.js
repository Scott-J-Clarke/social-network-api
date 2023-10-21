// Reaction model will be 'schema-only.'
// A 'schema-only' model will do data validation and structure, but it won't create an actual collection to store
// documents of that schema in the db.

const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: { type: Schema.Types.ObjectId, default: new ObjectId },
        reactionBody: { type: String, required: true, maxLength: 280 },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }
)

schema.path('createdAt').get(function (timestamp) {
    return moment(timestamp).format('YYYY-MM-DD');
});

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
