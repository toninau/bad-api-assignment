# Reaktor Assignment

https://pacific-ravine-08286.herokuapp.com/

## Client

Simple react app that displays product and availability information in a given category in a table. Product categories can be switched between gloves, facemasks and beanies.

## Server

Retrieves data from the legacy API every 5 minutes and combines product and availability information. Combined data is provided with an API.

Positives:
* Fast after all the required information is retrieved and combined for the first time.
* Only one API call is needed to get product and availability information.

Negatives:
* Product information is always "old", but this can be adjusted by setting the time between legacy API requests. 
* Takes a while to get product availability information on start up.

### API

```
GET http://localhost:3001/api/products/:type
```

Type options:
1. beanies
2. gloves
3. facemasks

Returns list of products in a category:

```
[
  {
    availability: "INSTOCK"
    color: ["black"]
    id: "d413270d3f0154678f4bb"
    manufacturer: "juuran"
    name: "ILSOP JUMP"
    price: 20
    type: "gloves"
  },
  ...
]
```

When server is still getting availability information of products, availability is set to “RETRIEVING”.