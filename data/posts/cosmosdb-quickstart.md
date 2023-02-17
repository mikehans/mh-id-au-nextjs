---
slug: "cosmosdb-quickstart-fixes"
date: "2023-02-03"
title: "Cosmos DB .NET Quickstart Fixes"
author: "Mike Hansford"
type: "post"
tags:
    - Azure
    - CosmosDB
    -.NET
    -C#
---
# CosmosDB Quickstart with fixes
## About
On the road to learning CosmosDB, I've been stepping through the CosmosDB Quickstart (https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/quickstart-dotnet).

This post documents my progress with the fixes that need to be applied to make it work.

For this quickstart, I'm using 
* .NET 6
* C#
* VS Code

## Problems with the Quickstart
* Designation of partition key 
    * not specified in the quickstart. Got an error when creating the container that I needed to provide a partition key.
    * Needs to be categoryId
* Clunky creation of the resource in bash (consider improving JSON handling)
* As the quickstart adds the CosmosDB URI and Key into local environment variables (local to the console), you need to do be sure to run the program from that console
    * You need to set up the environment vars again after you re-open the project and console you're running from.
    * A better option would be to put them in a local appsettings file (not a default part of a console app)
* under .NET 6, with the new Program.cs structure, you need to put the record at the end otherwise you get an error (what is the error?)
* ```await Container.CreateItemAsync<Product>()``` does not return a Product, rather it returns ```Task<ItemResponse<Product>>```. You then need to get the ```Resource``` property to get the ```Product```.
* the key is unused

## My re-write of the Quickstart
### What is desirable?
* A little bit of data design
    * partition key!
* Put keys into appsettings
* Break out the read and write functions into functions so the whole project is more comprehensible
* Insert a few records (several items in a few categories)
* Retrieve the records from the partition keys
* Correct sequencing and code
* link to Github repo
* integrate into running demo (on Netlify)
    * basic web app 
    * add an item with a category
    * retrieve an item
    * retrieve an item in a category

### Quickstart

