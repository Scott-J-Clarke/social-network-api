/* eslint-disable no-undef */
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { 
            type: String, 
            unique: true, 
            required: true, 
            trim: true 
        },
        email: {
            type: String, 
            unique: true, 
            required: true, 
            validate: {
                // Regex that validates the email address:
                validator: function (v) {
                    return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);
                },
                message: props => `${props.value} is not a valid email address.`
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought' 
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User', 
            }
        ]
    },
    {
        toJSON: { 
            virtuals: true,
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length; 
});

const User = model('User', userSchema);

module.exports = User;
