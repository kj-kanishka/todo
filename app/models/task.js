var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    description: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    },
    remainder: Date
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

taskSchema.method({

});

/**
 * Statics
 */
taskSchema.static({

});

/**
 * Register
 */

module.exports = mongoose.model('tasks', taskSchema);