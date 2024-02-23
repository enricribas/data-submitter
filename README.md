# Botco Data-Submitter

Everything you need to build integrations into your projects

### Requests

## Sending Data

From any HTTP sender POST with apikey parameter
This firebase function, so production URL will change. This is local testing version

#### local test
```bash
curl http://127.0.0.1:5001/botco-dynamic-data/us-central1/postData?apiKey=key&instanceID=default \
-X POST -H "Content-Type: application/json" \
-d '{"contactID": "dfsdfsd", "integrationID": "leadFlow", "requestID": "342342", "data": {"email": "sfadfadfadfsds@example.com", "name": "Wes Anderson"}}'

```

#### production
```bash
curl https://us-central1-botco-dynamic-data.cloudfunctions.net/postData?apiKey=key&instanceID=default \
-X POST -H "Content-Type: application/json" \
-d '{"contactID": "steve", "integrationID": "leads", "requestID": "steve32423", "data": {"email": "steve@example.com", "name": "Steve Anderson"}}'

```

## IDs and meanings

### apiKey

This is used to fetch the organization that is used for this integration

### instanceID

If a given org has more than once instance (chatbot), you can specify an optional instanceID, most likely the deployment ID. This defaults to "default" if not specified

### IntegrationID

This is the name of the integration. This is used to fetch the integration settings. This is most likely the name of the Data Submit card. 
Each integration can have many "integration points". 

- a single CRM
- a single Email
- many CRMs
- many Emails
- a combination of CRM and Emails

### ContactID 

Is unique to the person. A contact record will be created if it doesn't exist. If a contact exists with the same ID, it will be overwritten and merged with existing data. Newer data taking precedence. 

### RequestID

This is unique to the request. If the requestID already exists, new contact will NOT be created or updated. New emails WILL NOT be sent. New POSTs to CRM, Zapier, Syncari, will NOT be processed. 
If you wish to send a new request for the same contact, you will need a unique requestID. This ensures that we do not send duplicate records


## Setup

### Create apikey and Account

Under `/apikeys`
Add a document with the ID of the actual apikey and a field for `orgID` that matches the ID used in the `orgs` collection described below 


```bash
/apikeys/api8372384723874

{ orgID: "akua" }
```

### Create Integration
Under `/orgs/akua` *(must match orgID)*

Create a new collection called "integrations"

Under `orgs/akua/integrations`

Create a new document called whatever you want for IntegrationID in the curl example above. In our case, `leads`

So in `orgs/akua/integrations/leads` add data for type.
*This isn't really used yet*

table is not needed since contacts is the default
```
{
    type: "crm",
    table: "contacts" 
}
```

### Create Provider
Under `/orgs/akua/` 

Create a new collection called `providers`

Create a new document with ID of "zapier" and data

```
{ type: "third-party"}
```

### Create Integration Point (or Points)

Under `orgs/akua`

Create a new collection called "points"

Create a new document with an ID of your choosing

#### For example:

```
{ 
    integrationID: "leads",
    providerID: "syncari",
    webhookID: "prod-232-send-data" // only for syncari points
}
```

IntegrationID must match integration created above.

ProviderID must match provider created above.

##### Email integrations
a `template` field is needed

`addresses` array is needed
 
If you want to use handlebars syntax in the message, subject or in the addresses, you can use `{{attribute}}`

```
{ 
    addresses: ["email@botco.ai", "{{email}}"],
    subject: "This can have attributes too {{subject}}",
    template: "Message sent with handlebars syntax {{first_name}}"
}
```


##### CRM integrations
a `mapping` field is optional. Otherwise all data is set to integration unchanged.

This will take a `first_name` attribute in the payload and convert it to `FirstName` field for CRM export

| Note: Contacts table will NOT be converted, but shows raw data instead
This might change in the future if needed

**Your best bet is probably to just skip mappings field**
```
{
    integrationID: "leads"
    type: "crm"
    providerID: "zapier"
    mapping: {
        FirstName: "{{first_name}}"
    }
}
```

## Providers

### paubox

Needs to have API_TOKEN and API_USER environment variables

### syncari

Syncari providers require a webhookID field in the integration point setup. See example above. 

This can be any string but it must match in the Syncari setup for webhookID synapse


# Botco Dynamic Data

https://firestore.googleapis.com/v1/projects/botco-dynamic-data/databases/(default)/documents

plus the path to your data

e.g.

/org/akua/subject/Math/lesson/1/level/1/question/1

This returns data in the format...

```
{
  "name": "projects/botco-dynamic-data/databases/(default)/documents/org/akua/subject/Math/lesson/1/level/1/question/1",
  "fields": {
    "Answer3Block": {
      "stringValue": ""
    },
    "Answer4ImageURL": {
      "stringValue": ""
    },
    "Answer3ImageURL": {
      "stringValue": ""
    },
    "Question": {
      "stringValue": "5 Beach Towels"
    },
    "Answer2": {
      "stringValue": ""
    },
    etc..
```


NOTE: The data must be "open" to read or you will need to deal with authentication