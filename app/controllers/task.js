/*
Load all models here
*/
var mongoose = require('mongoose');
var tasks = mongoose.model('tasks');

var methods = {};
var response = {

    success: false,
    code: "",
    data: null,
    userMessage: '',
    errors: null
};

var NullResponseValue = function() {
    response = {
        success: false,
        code: "",
        data: null,
        userMessage: '',
        errors: null
    };
    return true;
};
var SendResponse = function(res, status) {
    res.status(status || 200).send(response);
    NullResponseValue();
    return
};


module.exports.controller = function(router) {

        router.route('/task')
            .post(methods.addTask)
            .put(methods.addRemainder)
            .delete(methods.delTask)

        router.route('/task/update')
            .post(methods.completeTask)
            .put(methods.updateTask)



    }
    /*********************
    Adding New Task
    *********************/

methods.addTask = function(req, res) {
    req.checkBody('description', 'description is required.').notEmpty()
    var errors = req.validationErrors(true);
    if (errors) {
        response.success = false;
        response.errors = errors;
        response.code = 10801;
        response.userMessage = 'something went wrong'
        return SendResponse(res, 400);
    } else {
        var newtask = new tasks({
            description: req.body.description

        });

        newtask.save(function(err, task) {
            if (err) {
                response.success = false;
                response.code = 10901;
                response.userMessage = 'Oops! Our bad! The server slept while doing that, we just poured it with some coffee. Can you please try doing it again?'
                return SendResponse(res, 500);
            } else {
                response.success = true;
                response.code = 200;
                response.data = task;
                response.userMessage = 'New task Added.'
                return SendResponse(res, 200);
            }
        })

    }
}

/*********************
    Adding New Task end here
*********************/

/*********************
    Adding Remainder
*********************/
methods.addRemainder = function(req, res) {
    req.checkBody('date', 'date is required.').notEmpty()
    req.checkBody('taskId', 'task Id is required').notEmpty()
    var errors = req.validationErrors(true);
    if (errors) {
        response.success = false;
        response.errors = errors;
        response.code = 10801;
        response.userMessage = 'something went wrong'
        return SendResponse(res, 400);
    } else {
        tasks.findOneAndUpdate({
                _id: req.body.taskId
            }, {
                remainder: req.body.date
            })
            .lean()
            .exec(function(err, user) {
                if (err) {
                    console.log("err", err)
                    response.success = false;
                    response.code = 500;
                    response.data = null;
                    response.userMessage = 'server slept for a while';
                    return SendResponse(res, 500);
                } else {
                    response.success = true;
                    response.code = 200;
                    response.data = null;
                    response.userMessage = 'Successfully Added Remainder'
                    return SendResponse(res, 200);
                }
            })
    }

}

/*********************
    Adding Remainder ends here
*********************/

/*********************
    Deleting A task
*********************/
methods.delTask = function(req, res) {
        req.checkBody('taskId', 'task Id is required').notEmpty()
        var errors = req.validationErrors(true);
        if (errors) {
            response.success = false;
            response.errors = errors;
            response.code = 10801;
            response.userMessage = 'something went wrong'
            return SendResponse(res, 400);
        } else {
            tasks.findOneAndRemove({
                _id: req.body.taskId
            }).exec(function(err, user) {
                if (err) {
                    console.log("err", err)
                    response.success = false;
                    response.code = 500;
                    response.data = null;
                    response.userMessage = 'server slept for a while';
                    return SendResponse(res, 500);
                } else {
                    response.success = true;
                    response.code = 200;
                    response.data = null;
                    response.userMessage = 'Successfully Deleted Remainder'
                    return SendResponse(res, 200);
                }
            })
        }
    }
    /*********************
        Deleting A task ends here
    *********************/

/*********************
    Mark task as completed
*********************/

methods.completeTask = function(req, res) {
        req.checkBody('taskId', 'task Id is required').notEmpty()
        var errors = req.validationErrors(true);
        if (errors) {
            response.success = false;
            response.errors = errors;
            response.code = 10801;
            response.userMessage = 'something went wrong'
            return SendResponse(res, 400);
        } else {
            tasks.findOneAndUpdate({
                    _id: req.body.taskId
                }, {
                    completed: true
                })
                .lean()
                .exec(function(err, user) {
                    if (err) {
                        console.log("err", err)
                        response.success = false;
                        response.code = 500;
                        response.data = null;
                        response.userMessage = 'server slept for a while';
                        return SendResponse(res, 500);
                    } else {
                        response.success = true;
                        response.code = 200;
                        response.data = null;
                        response.userMessage = 'Done.'
                        return SendResponse(res, 200);
                    }
                })
        }
    }
    /*********************
        Marking task as completed ends
    *********************/


/*********************
    Update Task
*********************/

methods.updateTask = function(req, res) {
        req.checkBody('taskId', 'task Id is required').notEmpty()
        req.checkBody('description', 'description Id is required').notEmpty()
        var errors = req.validationErrors(true);
        if (errors) {
            response.success = false;
            response.errors = errors;
            response.code = 10801;
            response.userMessage = 'something went wrong'
            return SendResponse(res, 400);
        } else {
            tasks.findOneAndUpdate({
                    _id: req.body.taskId
                }, {
                    description: req.body.description
                })
                .lean()
                .exec(function(err, user) {
                    if (err) {
                        console.log("err", err)
                        response.success = false;
                        response.code = 500;
                        response.data = null;
                        response.userMessage = 'server slept for a while';
                        return SendResponse(res, 500);
                    } else {
                        response.success = true;
                        response.code = 200;
                        response.data = null;
                        response.userMessage = 'Task Updated.'
                        return SendResponse(res, 200);
                    }
                })
        }
    }
    /*********************
        Updating task ends
    *********************/