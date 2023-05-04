---
slug: 'cosmos-db-sdk-exercises'
date: "2022-04-21"
title: "Azure Cosmos DB with .NET SDK"
description: "Discusses lessons learned while training with Cosmos DB"
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