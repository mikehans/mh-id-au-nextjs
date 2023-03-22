---
date: "2023-03-22"
slug: "azure-functions"
title: "Azure Functions Exercises"
description: 'Learning exercises in Azure Functions'
author: "Mike Hansford"
type: "project"
publish: true
---
In my pursuit of my Azure Developer certification, I have undertaken a series of exercises to learn to create Azure Functions in C#. The Github repo for this project can be found here: https://github.com/mikehans/az-funcs-exercise.

### Scenario
The scenario here is that I am obtaining a bunch of data from https://jsonplaceholder.typicode.com/posts (specifically 100 posts) and am writing the file into blob storage. From here, I'm parsing it into individual posts, ready for import into Cosmos DB, which I can query.

### Summary of the exercises
I wrote 4 functions for this project. The exercises are not intended to be anything that can be deployed to production - they're quite inefficient in terms of the number of functions that execute and the storage that gets consumed. In Azure terms, it's all cost.

The four functions are:
1. A function with an HTTP trigger that obtains the 100 posts from jsonplaceholder.typicode.com. It writes to blob storage.
1. A function with a blob storage trigger, that parses these posts into individual items and writes them into queue storage.
1. A function with a queue storage trigger, that writes these queue items into Cosmos DB.
1. A function with an HTTP trigger that takes an ID and queries Cosmos DB for the post with that ID.

As I said, it's inefficient but the point of the exercise is to gain some experience building functions that read and write to and from different triggers and bindings.

### Deployment instructions
To deploy the function app, I'll need a resource group containing a function app (.NET in-process), the associated storage account and a Cosmos DB account. All are in the same region to reduce latency between the components. The one change to make is to check that I'm on my free Cosmos DB account. You get 1 free Cosmos DB account per subscription. I forgot and incurred some small cost. Just ensure that the database is in the same region as the app.

In the function app's application settings, configure 2 settings:
* CosmosDbConnectionString
    * set it to the Primary Connection String setting from the Keys section of your Cosmos DB account
* AzureWebJobsStorage
    * a function app requires a storage account and this setting should be set to the storage account key during setup of the function app

The function app will create the storage containers it needs and the Cosmos DB and container if they don't already exist, so I have no need to create them by hand.

If only there was a way I could automate deployments from Github... and even create the infrastructure. You know, automatically...

