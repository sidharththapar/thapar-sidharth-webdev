module.exports = function(app)
{
    app.get("/api/test", findAllMessages);
    app.post("/api/test", createMessage);
    app.delete("/api/test/:id", deleteMessage);

    var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
    
    console.log('======>');
    console.log(process.env.MLAB_WEBDEV_NEU_UNAME);
    if(process.env.MLAB_WEBDEV_NEU_UNAME) { // check if running remotely
        var username = process.env.MLAB_WEBDEV_NEU_UNAME; // get from environment
        var password = process.env.MLAB_WEBDEV_NEU_PASS;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds139761.mlab.com:39761/heroku_v7g71n9h'; // user yours
    }
    console.log('<======');

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);
    console.log(connectionString)

    var TestSchema = mongoose.Schema({
        message: String
    });

    var TestModel = mongoose.model("TestModel", TestSchema);

    function findAllMessages(req, res) {
        TestModel
            .find()
            .then(
                function(tests) {
                    res.json(tests);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessage(req, res) {
        TestModel
            .create(req.body)
            .then(
                function(test) {
                    res.json(test);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessage(req, res) {
        TestModel
            .remove({_id: req.params.id})
            .then(
                function(result) {
                    res.json(result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};
