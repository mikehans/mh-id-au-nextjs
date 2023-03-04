---
slug: "cosmosdb-quickstart-fixes"
date: "2023-02-03"
title: "Cosmos DB .NET Quickstart Fixes"
author: "Mike Hansford"
type: "post"
tags:
    - Azure
    - CosmosDB
    - .NET
    - C#
---
# CosmosDB Quickstart with fixes
## About
On the road to learning CosmosDB, I've been stepping through the CosmosDB Quickstart (https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/quickstart-dotnet).

This post documents my progress with the fixes that need to be applied to make it work.

For this quickstart, I'm using: 
* .NET 6
* C#
* VS Code
* dotnet cli
* Powershell

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
#### Pre-requisites
* An Azure subscription
* .NET 6
* Azure PowerShell

#### Follow the Quickstart section "Create an Azure Cosmos DB account"
1. Connect to your Azure Account

Type: ```Connect-AzAccount```. A browser window should open for you to log into your Azure account.

2. Create a Resource Group

Type ```New Az-ResourceGroup```

3. Create your CosmosDB account 

```New-AzCosmosDBAccount```

Creating it will take a while...

A couple of notes here:
* A CosmosDB can be named with only lowercase letters, a hyphen and numeric characters.
* In PowerShell, you'll have to remember to express the boolean value for ```-EnableFreeTier``` as ```$true``` rather than just ```true```.

In both cases, PowerShell will throw an error at you if you make a mistake. 

So far, we're still just following the Quickstart as written. 

Take a note of the ```DocumentEndpoint``` property in the output of the last cmdlet. You'll need that in a bit.

Get the PrimaryMasterKey using ```Get-AzCosmosDBAccountKey``` and record the returned key. You'll need that in a bit too.

#### Continue with the Quickstart section "Create a new .NET app"
1. Create a new console app

Note that I have added the ```-f net6.0``` switch because I have .NET 7 installed but I want .NET 6 for this quickstart.

2. Install the ```Microsoft.Azure.Cosmos``` package

3. Build. We want to build to resolve any problems VSCode has with resolving types.

#### Replace the step "Configure environment variables"
I don't want to configure environment variables here. Rather I'm going to use appsettings. While using environment variables are perhaps a "better" production approach, using appsettings helps with producing a demo app that is more convenient to start. I'll be using the ```Microsoft.Extensions.Hosting.IHost``` interface to start my console app, so I'll be able to access the configuration variables I need no matter whether the variables are in environment variables, appsettings or a number of other default configured locations. All this gets set up when I call ```Host.CreateDefaultBuilder()```. 

#### Authenticating the client
In my implementation, I've used the ```DefaultAzureCredential``` class for providing passwordless authentication. The quickstart says it's provided by the Azure Identity client library. I'm yet to look further into authentication in Azure. This leads to persistent concerns that I may not be the only person able to access Azure resources I've created. It's one unfortunate outcome of what I've been focussed on.

*Creating the custom role*
The quickstart does not provide a PowerShell command sample to create a role definition. However there is an appropriate sample in the CosmosDB doco: [https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-setup-rbac], under the headings "Create custom role definitions" -> "Using Azure Powershell". I've pasted it below for reference.

```Powershell
$resourceGroupName = "<myResourceGroup>"
$accountName = "<myCosmosAccount>"
New-AzCosmosDBSqlRoleDefinition -AccountName $accountName `
    -ResourceGroupName $resourceGroupName `
    -Type CustomRole -RoleName MyReadOnlyRole `
    -DataAction @( `
        'Microsoft.DocumentDB/databaseAccounts/readMetadata',
        'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/items/read', `
        'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/executeQuery', `
        'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/readChangeFeed') `
    -AssignableScope "/"
```

Modifying this sample for the quickstart, I have this:
```Powershell
$resourceGroupName = "CosmosQuickstart"
$accountName = "quickstart-db"
New-AzCosmosDBSqlRoleDefinition -AccountName $accountName `
    -ResourceGroupName $resourceGroupName `
    -Type CustomRole `
    -RoleName PasswordlessReadWrite `
    -DataAction @( `
        'Microsoft.DocumentDB/databaseAccounts/readMetadata', `
        'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/items/*', `
        'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/*' `
       ) `
    -AssignableScope "/"
```

Take note of the ID field that gets returned. We'll need it later.


*Obtaining the details of your user account*
I had a problem with the command line tools for both Azure Powershell and the az CLI, so I obtained the Object ID parameter for my user account from the Azure AD GUI console.

*Creating a CosmosDB Role Assignment*
Once again, there is no Powershell code sample. Creating a CosmosDB role assignment is documented here: [https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-setup-rbac].
```Powershell
$resourceGroupName = "CosmosQuickstart"
$accountName = "quickstart-db"
$roleDefinitionId = "<roleDefinitionId>" # as fetched above
# For Service Principals make sure to use the Object ID as found in the Enterprise applications section of the Azure Active Directory portal blade.
$principalId = "<aadPrincipalId>"
New-AzCosmosDBSqlRoleAssignment -AccountName $accountName `
    -ResourceGroupName $resourceGroupName `
    -RoleDefinitionId $readOnlyRoleDefinitionId `
    -Scope "/" `
    -PrincipalId $principalId
```

*Create the database*
I want to use ```New-AzCosmosDBSqlDatabase```. The documentation is here: [https://learn.microsoft.com/en-us/powershell/module/az.cosmosdb/new-azcosmosdbsqldatabase]

The command to execute is as follows:
```Powershell
 New-AzCosmosDBSqlDatabase -ResourceGroupName CosmosQuickstart `
    -AccountName quickstart-db -name cosmicworks
```

*Create the container*
Here's where the quickstart has a problem: The quickstart provides no information here as to what the partition key is to be, however it is required and it matters.

We need to provide values for 2 properties here: 
* PartitionKeyKind
* PartitionKeyPath

Reading on, we discover that the quickstart wants to make the CategoryID the partition key.

The difficult parameter is PartitionKeyKind. There's no equivalent in the GUI, so what is it?