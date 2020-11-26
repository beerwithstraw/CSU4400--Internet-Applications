const AWS = require("aws-sdk");
const express = require("express")
const path = require("path")

const app = express()
const publicKey = "AKIAXSRFFSH5EKGZQ5LE"
const privateKey = "RMICI4FXFLbQCEVrQVrlVB14llz7m4C5oq7otqzU"

let publicPath = path.resolve(__dirname, "public")
app.use(express.static(publicPath))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"))
})

const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT} \n`));

AWS.config.update({
    accessKeyId: publicKey,
    secretAccessKey: privateKey,
    region: "eu-west-1",
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

app.post('/createDatabase', (req, res) => {
    console.log("Creating Table...")
    var params = {
        TableName: "Movies",
        KeySchema: [
            //Partition key
            { AttributeName: "year", KeyType: "HASH" },  
            //Sort key
            { AttributeName: "title", KeyType: "RANGE" }  
        ],
        AttributeDefinitions: [
            { AttributeName: "year", AttributeType: "N" },
            { AttributeName: "title", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 20,
            WriteCapacityUnits: 20,
        }
    };
    dynamodb.createTable(params, function (err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Table Created. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
    var s3BucketParams = {
        Bucket: 'csu44000assignment220',
        Key: 'moviedata.json'
    }
    var s3 = new AWS.S3();
    s3.getObject(s3BucketParams, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            var allMovies = JSON.parse(data.Body.toString());
             allMovies.forEach(function (movie) {
                // console.log(allMovies);
                var tableParams = {
                    TableName: "Movies",
                    Item: {
                        "title": movie.title,
                        "year": movie.year,
                        "release": movie.info.release_date,
                        "director":  movie.info.directors,
                        "rating": movie.info.rating,
                        "rank": movie.info.rank,
                    }
                
                };
                

                docClient.put(tableParams, function (err) {
                    if (err) {
                        console.error("Error. Can't add Movie: ", movie.title);
                    } else {
                        console.log("Added Movie:", movie.title);
                    }
                });
            });
        }
    })
});



