const { Schema, model } = require('mongoose');

// Schema to create User model:
const userSchema = new Schema(
    {
        username: { type: String, unique: true, required: true, trim: true },
        email: {
            type: String, unique: true, required: true, validate: {
                // This is the regex that validates the email address:
                validator: function (v) {
                    return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);
                },
                message: props => `${props.value} is not a valid email address.`
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought', // Will this reference the 'Thought' model?
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User', // Will this reference the 'User' model?
            }
        ]
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length; // Should this be 'friends'? Does it reference something else?
});

const User = model('User', userSchema);

module.exports = User;
