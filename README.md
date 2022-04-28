# Vending Machine - Backend

The vending machine backend is build using REST Framework. The backend can have any ingredients and beverages. It also stops accepting the orders if the ingredint are not sufficient to dispense the beverage.

## Technologies used
- NodeJs
- ExpressJs
- TypeScript
- TypeORM
- MySQL 

## Features
- Add Ingredients (Any Ingredients) 
- Add Beverages(Any beverage) ☕
- Top up Ingredients 
- Update the Beverages reciepe.
- Stop orders if Ingredient not available and notify Admin

## Assumptions
- The response where the beverage is not getting dispensed is assumend to send a email notification from backend.
- 🧑 User in the request will send the beverage name and the recepie for it to be dispensed.


## Endpoints
### Admin
-  #### /admin/topup  - POST
This tops up the ingredints if exits or else it adds them 
```
body:
{
    "water": "4",
    "coffee": "2",
    "sugar": "3",
    "milk": "6"
}
```

-  #### /admin/add-beverage   - POST
This adds the beverage if does not exits or else it updates the existing bevearge if the new one is changed
```
body:
{
    "beverageName":"Sugarless Coffee With Milk",
    "ingredients":["water","coffee","milk"]
}
```


-  #### /admin/reset   - GET
This resets all the ingredients quantity to zero

### User
-  #### /user/status   - GET
This gets the qunatity of all the ingredients to display

-  #### /user/dispense   - POST
This endpoint will dispense the beverage if there are sufficent ingredients or else it will give you a error message for why the beverage is not dispened. This is also notify the admin if the ingrdeints are not suffictient for dispensing
```
body:
{
    "name": "Sugarless Coffee With Milk",
    "ingredients": [
        {
            "name": "coffee",
            "quantity": 1
        },
        {
            "name": "milk",
            "quantity": 2
        },
        {
            "name": "water",
            "quantity": 1
        }
    ]
}
```

## Preqeuiste to run the project
- Have Nodejs installed 
- Have mysql database installed
- Have a database name `vendingapp`
- Also add all the connection details for database in `data-source.ts` file.


## Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command
