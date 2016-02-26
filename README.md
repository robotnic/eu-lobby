# EU-Lobby

UI for http://parltrack.euwiki.org/

## INSTALL

Copy data
---------

ep_dossiers.json  ep_meps_current.json  ep_votes.json

Import to mongo
--------------
```
mongoimport --upsert --db feathers --collection messages --file ep_dossiers.json



http://stackoverflow.com/questions/24537220/how-to-import-large-json-file-into-mongodb-using-mongoimport

//copy field "_id" to "id"
db.dossiers.find().forEach(function(doc){doc.id=doc._id;db.dossiers.save(doc)})

//integer to string for "UserID"
db.meps.find().forEach(function(doc){doc.UserID=doc.UserID+"";db.meps.save(doc);});

```



## Implementation

* Angular Material
* Backend featherjs

