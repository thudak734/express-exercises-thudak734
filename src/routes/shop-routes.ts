import express from "express";
import Item from "../models/Shop";
import Shop from "../models/Shop";
const shopRoutes = express.Router();


  

const shops: Shop[] = [
    { id: 111, name: "Pepper's Pizza"    , rating: 4.5 },
    { id: 222, name: "Clive's Chives"    , rating: 3.4 },
    { id: 333, name: "Bretty's Brews"    , rating: 4.3 },
    { id: 444, name: "Sylvester's Shoes" , rating: 3.8 },
    { id: 555, name: "Teddy's Tunes"     , rating: 4.7 }
];
let nextId: number = 666;

// // Query string parameters: the request may have one of the following or it may have none. (See test cases below for examples.)
// maxPrice - if specified, only include products that are at or below this price.


shopRoutes.get("/", function (req, res){
    res.render('home');
});

shopRoutes.get("/shop-list", function (req,res){
    res.render('shop-list', {shops});  
});



// //Query ?minRating=4.0
shopRoutes.get("/api/shop", function(req, res){
    let minRatingParam: string = req.query.minRating as string;
    if(minRatingParam){
//         //req.query.minRating
        let minRating: number = Number.parseFloat(minRatingParam);
        // if shops[i].rating >= req.query.minRating
       
        let filteredShops: Shop[] = shops.filter(shop => shop.rating >= minRating);
        res.json(filteredShops);
    } else {
        res.json(shops);
    }
    
});

shopRoutes.post("/api/shop", function(req, res){
    let newShop: Shop = {id: nextId, name: req.body.name, rating: req.body.rating};
//     // newShop.id = nextId;
    nextId += 111;
    shops.push(newShop);
    res.status(201);
    res.json(newShop);
});

shopRoutes.get("/api/shops/:id", function (req, res) {
	let idNum: number = parseInt(req.params.id);
	let match = shops.find((shop) => shop.id === idNum);
	if (match) {
		res.json(match);
	} else {
		res.status(404).send({ error: `Shop not found: ${idNum}` });
	}
});


shopRoutes.get("/api/shop-details/:id", function (req, res) {
	let idNumber: number = parseInt(req.params.id);
	let match = shops.find((shop) => shop.id === idNumber);
	if (match) {
		res.render("shop-details", {shops});
	} else {
		res.status(404).render("404", {idNumber});
	}
});

shopRoutes.delete("/api/shops/:id", function (req, res) {
	let inputId: number = Number.parseInt(req.params.id);
	let shopIndex: number = shops.findIndex((shop) => shop.id === inputId);
	shops.splice(shopIndex, 1);
	res.status(204);
	res.json("");
});


shopRoutes.get("/add-shop", function (req, res) {
    res.render("add-shop");
  });


shopRoutes.post("/added-shop", function (req, res){
    let name = req.body.name;
    let rating = req.body.rating;
    let newShop: Shop = {name: name, rating: rating}//name and rating are objects
    newShop.id = nextId;
    nextId += 111;
    shops.push(newShop);
    res.render("added-shop", {newShop})
})


shopRoutes.get("/search", function (req, res) {
    res.json('Keyword: ${req.query.keyword} || Page: ${req.query.page}')

})



export default shopRoutes;
// const items: Item[] = [
//     { id: 1, product: "Apple", price: 0.99, quantity: 10 },
//     { id: 2, product: "Blueberry", price: 4.37, quantity: 8 },
//     { id: 3, product: "Cinnamon", price: 2.99, quantity: 1 },        From tutoring session
//     { id: 4, product: "Cheese", price: 1.5, quantity: 2 },
//     { id: 5, product: "Cream", price: 2.69, quantity: 4 },
//     { id: 6, product: "Crisp", price: 12.99, quantity: 5 },
//     { id: 7, product: "Rhubarb", price: 3.89, quantity: 3 }
//   ];

// shopRoutes.get("/cart-items", function (req,res){
//     let maxPrice: string = req.query.maxPrice as string;
//     let results = items
//     let prefix: string = req.query.prefix as string;
//     let pageSize: string = req.query.pageSize as string;

//       if (maxPrice){
//             results = items.filter((item)=>{
//             return item.price <= parseFloat(maxPrice)
//         })
        
//     }                                                                  From tutoring session
    
//         if (prefix){
//             results = items.filter((item)=>{
//             return item.product.toLowerCase().startsWith(prefix)     
//         })
            
//     }
    
//         if (pageSize){
//             results = items.slice(0, parseInt(pageSize))
//         }

//     res.status(200)
//     res.json(results)
// });


