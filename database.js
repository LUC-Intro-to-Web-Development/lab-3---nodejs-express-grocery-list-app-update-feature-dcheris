var sqlite3 = require('sqlite3').verbose() //npm install sqlite3

//Creating a new database instance - Indication of connected database
//Before peforming any operations to database, make sure database is connected.
let db = new sqlite3.Database('./grocerydb.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
	  // Cannot open database
	  console.error(err.message)
	  throw err
	}else{
		//Successful database connection
		console.log('Connected to the SQLite database.') 
	}
});
/**
 * The sqlite3 Node.js package gives a handful of different methods for executing queries, but the ones I will be focusing on in this tutorial are:

        run: used to create or alter tables and to insert or update table data
        get: select a single row of data from one or more tables
        all: select multiple rows of data from one or more tables
 */


// CREATE A GROCERY LIST ITEM
let createItem = (item_name, item_count, res) =>{
    var createGroceryListItem = 'INSERT INTO grocery_item (item_name, item_count) VALUES (?,?)' //  PARAMETERIZED QUERY
    var params = [item_name, item_count];
    
    db.run(createGroceryListItem, params, function(err){

        if(err){
            return console.log(err.message);
        }
        
        getAllItems(res);
    })
}

//Display a grocery item
let getAItem = (id, res) => {
    var getGroceryItem = 'SELECT itemID, item_name, item_count, description FROM grocery_item WHERE itemID = ?';
    var params = [id];
    db.get(getGroceryItem, params, function(err, row){
        if (err) {
         
            throw err;
          }
          
          console.log(row);
          res.render('update', {row});

    })
    
}

// DISPLAY ALL GROCERY LIST ITEMS
let getAllItems = (res) => {
    var getAllGroceryItems = 'SELECT itemID, item_name, item_count, description FROM grocery_item';
    db.all(getAllGroceryItems, function(err, rows){
        if (err) {
         
            throw err;
          }
          console.log(rows);
		res.render('index', {rows})

    })

}

// UPDATE A GROCERY LIST ITEM ***** WILL NEED TO CHECK IF THIS FUNCTION WORKS***

var updateItem = (updatedGroceryItem, res) =>{
    var updateGroceryItem = 'UPDATE grocery_item SET item_name = ?, item_count= ?, description = ?  WHERE itemID = ?';
    var params = [updatedGroceryItem.item_name,updatedGroceryItem.item_count,updatedGroceryItem.itemID, updatedGroceryItem.description];

    db.run(updateGroceryItem,params,function(err){

		if (err){
			return console.log(err.message);
		}
    

        console.log("Grocery Item Updated");
        console.log(`Rows updated ${this.changes}`);
      });

      getAllItems(res);

}

/*
var confirm_Update = (updaterecord,res) => {
    var getConfirmUpdate = 'UPDATE `grocery_item` SET itemID = ? item_name = ? item_count = ?, WHERE itemID = ?';

	// UPDATE SQL STATEMENT HERE. PARAMETERS OF THE NEW VALUES
    var params = [updaterecord.itemID, updaterecord.item_name,updaterecord.item_count]
    db.run(getConfirmUpdate,[res.body, res.params],function(err,row){

        if(err){
            return console.log(err.message);
        }
        console.log("Grocery Item Updated");
		res.render('index', {row});
        });
       
        getAllItems(res);
}
*/

// DELETE A GROCERY LIST ITEM
var deleteItem = (recordToDelete,res) =>{
    
    var deleteGroceryItem = 'DELETE FROM grocery_item WHERE itemID = ?';
	
    var params = [recordToDelete];

	db.run(deleteGroceryItem, params, function(err){
		if (err){
			return console.log(err.message);
		}
        console.log("Grocery Item Deleted");
        console.log('Rows deleted ${this.changes}');
        });
    
        getAllItems(res);
    }

module.exports = {deleteItem,createItem, updateItem, getAItem, getAllItems}
