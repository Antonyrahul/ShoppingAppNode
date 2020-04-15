const express = require('express');
const app = express();
const cors = require('cors')

const bodyparser = require('body-parser');
const mongodbclient = require('mongodb');
url = "mongodb://localhost:27017/productDB"
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())
dbName = "productDB"
dbCollection = "products"
app.get('/', function (req, res) {
    res.redirect("http://localhost:4200")
   console.log("Connection from angular")
   //mongodb+srv://antonyrahul96:<password>@cluster0-nl7jd.mongodb.net/test?retryWrites=true&w=majority
/*mongodbclient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db("productDB");
    
        
        var userData = {
            id:"mobile2",
            name:"Iphone 10",
            category:"mobiles",
            price : "INR 110,000",
            imgsrc : "https://www.appsquadz.com/blog/wp-content/uploads/2016/12/iPhone-Apps.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!"
            
        }
        db.collection("products").insertOne(userData, function (err, data) {
            if (err) throw err;
            client.close();
            res.json({
                message: "saved"
            })
        })
        // Store hash in your password DB.
  

   // client.close();
});*/
})

app.post('/displayproducts', function (req, res) {
    console.log(req.body);
    mongodbclient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db(dbName);
     
            if(Object.keys(req.body).length === 0)
            {
                db.collection(dbCollection).find({}).toArray(function (err, data) {
                    if (err) throw err;
                    client.close();
                    res.json({
                        message: "saved",
                        data:data
                    })
                })
            }
            else{
            userdata = req.body
           // db.collection(dbCollection).findOne(userData,{projection: {expense:true}}, function (err, data) {
            db.collection(dbCollection).find(userdata).toArray(function (err, data) {
                if (err) throw err;
                client.close();
                res.json({
                    message: "saved",
                    data:data
                })
            })
        }
            // Store hash in your password DB.
        

       // client.close();
    });

})

app.post('/addproduct', function (req, res) {
    console.log(req.body);
    mongodbclient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db(dbName);
        
            
          //  var userData = req.body
                
                
            
           db.collection(dbCollection).insertOne(req.body, function (err, data) {
                if (err) throw err;
                client.close();
                res.json({
                    message: "saved"
                })
            })
            // Store hash in your password DB.
     

       // client.close();
    });

})

app.post('/editproduct', function (req, res) {
    console.log(req.body);
    mongodbclient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db(dbName);
        
            
            var filter ={
                productid : req.body.productid
                
            }
            console.log(filter)
          
            db.collection(dbCollection).updateOne(filter,{$set:req.body}, function (err, data) {
                if (err) throw err;
                client.close();
                res.json({
                    message: "sucess"
                })
            })
            // Store hash in your password DB.
    

       // client.close();
    });

})

app.post('/verifyproduct', function (req, res) {
    console.log(req.body);
    mongodbclient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db(dbName);
      
           
            
                
           
            db.collection(dbCollection).findOne(req.body,function (err, data) {
                console.log(data)
                if (err) throw err;
                client.close();
                if(data)
                res.json({
                    message: "sucess",
                    data:data
                })
                else{
                    res.json({
                        message: "failed"
                    })
                }
            })
            // Store hash in your password DB.
        

       // client.close();
    });

})

app.listen(4123, '0.0.0.0', function () {

    console.log("listening on port 4123");
});

/*
 editProduct(data):Observable<any>{
    console.log(data)
    return this.http.post('http://localhost:4123/editproduct',data)
  }

  verifyProduct(data):Observable<any>{
    console.log(data)
    return this.http.post('http://localhost:4123/verifyproduct',data)
  }
  */