---
slug: 'cosmos-db-sdk-exercises'
date: "2022-04-21"
title: "Azure Cosmos DB with .NET SDK"
description: "Discusses lessons learned while training with Cosmos DB for AZ-204"
author: "Mike Hansford"
type: "post"
tags:
    - Azure
    - AZ-204
    - Cosmos DB
---

Notes
* Key vs RBAC
    * keys are older
    * less granualar (read/write or read only)
    * RBAC:
        * allow for minimum trust
        * create a RoleDefinition of CustomType
        * add users / groups with a RoleAssignment
        * seems you may not be able to create a database / container this way (see the Important note here: https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-setup-rbac#permission-model)

* Was getting HTTP 400 errors that I had trouble resolving - little info
    * issue was that the partition key was /id while the object had Id. I need to resolve this. One way is to add a JsonPropertyNameAttribute, setting name to "id"
    (get a screenshot of the error)

# Cosmos DB Exercises
Cosmos DB is one of the requirements for the AZ-204 domain "Develop for Azure Storage". This article unpacks some of the lessons from exploring the scope of this requirement with respect to the SDK. 

As of the time of writing, I am yet to attempt the exam.

## Exam scope
The exam covers both features of Cosmos DB as well as working with it via the SDK. Per the exam review video on MS Learn, I also expect that I need to have some understanding of the key relevant parts of the Azure CLI and / or Powershell.

The content on the MS Learn path consists of two modules: one focussed on Cosmos DB features and the other on using the SDK. The exam focusses wholly on the Core SDK (ie. the SQL SDK).

### Skills measured
As usual, the [Skills Measured](https://learn.microsoft.com/en-us/certifications/resources/study-guides/AZ-204) section of the exam is extraordinarily brief. Here's the bullet points:
* Perform operations on containers and items by using the SDK
* Set the appropriate consistency level for operations
* Implement change feed notifications

## Non-SDK requirements
### APIs
It seems that it's sufficient to know that there are 5 SDKs available. They are:
* API for Mongo DB
    * a protocol consistent with Mongo DB
    * it exists for treating Mongo DB as a legacy tech for migration
* API for Cassandra
    * a protocol consistent with Cassandra
    * it exists for treating Cassandra as a legacy tech for migration
* Gremlin API (Graph SDK)
    * a protocol consistent with Gremlin (graph DB language)
    * it is the same Graph Query Language as Apache Tinkerpop
    * it appears that this one is not considered to be a legacy migration protocol
* Table API
    * it is essentially Table Storage on Cosmos DB
    * gets around limitations of Table Storage, like
        * latency
        * fixed throughput
        * worldwide distribution
        * limited index management
        * poor query performance (?)
* Core (SQL) SDK

Note: There is also now a PostgreSQL API, though this doesn't appear to have been added to the exam yet. Very briefly, the overview page for it says that it uses the Citus PostgreSQL extension (which contains superpowers! - TA DA!) to create distributed tables. It appears that JOINs and foreign keys are supported. Whether this is considered to be a legacy API, it is unclear. Or even, what the core use case is for this API.

### Understanding Request Units (RUs)

### Consistency levels
This one is important as it has a big effect on data consistency across replicas, as well as the RU cost of operations and the throughput possible.

Consistency is set at the _account_ level. Therefore, all databases within the account will have the same consistency level.

Consistency is the key to globally distributing your database and raising service availability to up to 99.999%. Data is transparently replicated to all regions associated with the Cosmos DB account. You will also gain improvements to application responsiveness as you can locate data closer to your users.

The [documentation for consistency levels](https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels) is helpful here.

#### So what are they?
In order from most consistent, to least consistent they are:
* Strong
* Bounded staleness
* Session (default)
* Consistent prefix
* Eventual

Let's point out that this won't apply for a Serverless Cosmos DB account as this is constrained to a single region. Similarly, it's also not really relevant to a Cosmos DB account with provisioned throughput running in only a single region. 

_Strong_ consistency:
* guarantees the most recently committed version will be returned for all reads

_Bounded staleness_ consistency:
* states that you may experience some lag between the write and its read availablity in other regions
    * the staleness is configurable and can be either
        * a number of versions of the item, or
        * a time interval
    * if staleness exceeds the configured thresholds, writes will be throttled until the boundaries are satisfied
* from the documentation: "this consistency form is beneficial primarily to single-region write accounts with two or more regions"
* of note, the documentation clearly states that this consistency form for multi-write accounts is an anti-pattern

_Session_ consistency:
* within a single client session, reads are guaranteed to read the most recent write
    * all client instances sharing a session token will be consistent
* generally suits the needs of applications written to operate in the context of a user
* provides write latencies, availability and read throughput comparable to eventual consistency

_Consistent prefix_ consistency:
* updates made as single document writes see eventual consistency (roughly verbatim from the documentation)
* updates made as a batch within a transaction are returned consistent to the transaction (roughly verbatim from the documentation)
    * The documentation elaborates with the following example:
        * a transaction updates Doc1 and Doc2
        * when a client that reads from any replica
        * the client will either see 
            * Doc1 v.1 and Doc2 v.1, or
            * Doc1 v.2 and Doc2 v.2
            * but never Doc1 v.1 and Doc2 v.2

_Eventual_ consistency:
* a replica may return stale or no data for a read
* there are no ordering guarantees
    * makes it useful for basic aggregation such as tallying "likes"

In additon:
* the documentation states that for all consistency levels weaker than Strong, writes are replicated to a minimum of 3 replicas in the local region, with asynchronous replication to other regions
* the RU cost of reads in Stong and Bounded Staleness are twice that of the other consistency levels owing to how consistency guarantees are made

## SDK requirements
### Core SDK classes
Know how to use the following:
* CosmosClient
    * CosmosClientOptions
* Database
* Container
* QueryDefinition
* FeedIterator<T>

In the exam readiness videos, they say over and over again that this is not a syntax exam. So, there's no need to recall in perfect detail every nuance of them. However, it is important to understand the relationships between the key classes, what they do and the key methods and properties of them.

My Github contains a project containing [a set of C# exercises](https://github.com/mikehans/az-cosmosdb-sdk-exercises) that helped me to understand the SDK.

#### SDK exercises
The project connects to an existing CosmosDB database, bulk uploads some data, modifies a record, deletes a record and queries the database. 

I used a bulk upload rather than a single create item operation as a bulk upload essentially is essentially a group of individual create operations, executed as a list of Tasks. Each task is a call to ```Container.CreateItemAsync()```, which is the way you write a single record. The ```CosmosClient``` also requires some configuration with an object of type ```CosmosClientOptions```.

The demo project is a console application. I have used dependency injection to create a singleton ```CosmosClient```. I have provided two options for constructing it: one using a connection string; the other using a URI and a ```DefaultAzureCredential()```.  Both options take as their final parameter a ```new CosmosClientOptions()``` instance, where the client is configured for bulk uploads.

Below are the two variations I have used for configuring the ```CosmosClient```.
```csharp
    //   1. initialise with a connection string
    services.AddSingleton(
                s => new CosmosClient(
                        ctx.Configuration["CosmosDbConnectionString"],
                        clientOptions: new CosmosClientOptions() { AllowBulkExecution = true }));
```

```csharp
    //   2. initialise with DefaultAzureCredential - recommended in docs
    services.AddSingleton(
        s => new CosmosClient(
                "https://product-catalogue-db.documents.azure.com:443/",
                tokenCredential: new DefaultAzureCredential(),
                clientOptions: new CosmosClientOptions() { AllowBulkExecution = true }));
```

There was a problem with ```DbManagement.EnsureDbCreated()``` and ```DbManagement.EnsureContainersCreated()``` methods. Assuming that the database / containers exist, everything is fine (the ```Create[Database|Container]IfNotExistsAsync()``` methods are essentially no-ops in this case) however if the methods have to create an object, they fail. I'm not entirely sure why. I think I found a suggestion that this was an improper use of the SDK but I can't find the documentation around this now. [Documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/how-to-dotnet-create-container) clearly says it is a supported operation.

I have, however left these methods in the code for reference. They are just not being executed.

### Core operations (add, query, update, delete)
#### Add
```csharp
    container.CreateItemAsync(item, new PartitionKey(item.id))
```

In the demo project, I am reading a collection of categories in from a JSON file, parsing them as a collection of ```CategoryDTO``` objects, creating a new item from each one in a Task, then executing all the tasks at once with ```Task.WhenAll()```.

In the code snippet above, ```item``` represents a ```CategoryDTO``` object. I also need to new up a ```PartitionKey``` object and pass in the value being used. My container design in this case puts every category in its own logical partition.

#### Query


#### Update


#### Delete


### Change feed
* very important

### Stored procedures
* no mention of them in the [Exam review video](https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-204-develop-for-azure-storage-segment-2-of-5) but it's covered in the MS Learn content

### User-defined functions
* no mention of them in the [Exam review video](https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-204-develop-for-azure-storage-segment-2-of-5) but it's covered in the MS Learn content