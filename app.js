const express = require('express');
const dbOperations = require('./database.js');
const app = express();
const port = 3000

/**To serve static files such as images, CSS files, and JavaScript files, create a folders
* and include the below statement.  The below statement assumes that I have a folder named assets
**/
app.use(express.static('assets'))

// view engine setup
app.set("view engine", "hbs");

// parse application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// ROUTE TO HOME PAGE
app.get('/', function (req, res) {

  dbOperations.getAllItems(res);
})


// ROUTE TO UPDATE PAGE
app.get('/update_item', function (req, res) {

  dbOperations.getAllItems(res);
})

// ROUTE TO CREATE GROCERY LIST ITEM
 app.post('/create_item', function (req, res) {

	// GETTING BODY PARAMETERS
  const {item_name, item_count}= req.body;

  // EXECUTE createItems METHOD
  dbOperations.createItem(item_name, item_count, res);

 })

 // ROUTE TO DELETE GROCERY ITEM
 app.post('/delete_item', function (req, res) {
	// GETTING BODY PARAMETERS
  const {deleterecord}= req.body;
  dbOperations.deleteItem(deleterecord);

 })

 // ROUTE TO UPDATE GROCERY LIST ITEM
 app.post('/update_item', function (req, res) {

	// GETTING BODY PARAMETERS
  const {item_name, item_count}= req.body;
  dbOperations.updateItem(item_name, item_count);

 })
 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))