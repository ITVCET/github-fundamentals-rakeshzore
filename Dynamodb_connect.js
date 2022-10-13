// To install aws-sdk npm package, run below command in terminal:
//$ npm i aws-sdk --save

config = {
    aws_table_name: 'dynamodb-test',
    aws_local_config: {
  
    },
    aws_remote_config: {
      accessKeyId: 'ACCESS_KEY_ID',
      secretAccessKey: 'SECRET_ACCESS_KEY',
      region: 'us-east-1',
    }
};

const AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');

const getMovies = function (req, res) {
    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.aws_table_name
    };

    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.send({
                success: true,
                movies: Items
            });
        }
    });
}

const addMovie = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
    Item.id = uuidv1();
    var params = {
        TableName: config.aws_table_name,
        Item: Item
    };

 
    docClient.put(params, function (err, data) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        } else {
            res.send({
                success: true,
                message: 'Added movie',
                movie: data
            });
        }
    });
}

module.exports = {
    getMovies,
    addMovie
}
