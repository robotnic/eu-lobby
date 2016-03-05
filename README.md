# EU-Lobby

UI for http://parltrack.euwiki.org/

## INSTALL

Copy data
---------
This script copies data from parltrack and unpacks it to the data folder. After db import you can delete the files in "data" folder.
```
node install.sh
```

Import to mongo
--------------
```
mongoimport --upsert --db feathers --collection messages --file ep_dossiers.json
mongoimport --upsert --db eulobby --collection dossiers --file data/dossiers.json 
mongoimport --upsert --db eulobby --collection meps_current --file data/meps_current.json 
mongoimport --upsert --db eulobby --collection votes --file data/votes.json 
mongoimport --upsert --db eulobby --collection amendments --file data/amendments.json 
```
(there may be lots of exeptions, but it should still import data)


//copy field "_id" to "id"
```
db.dossiers.find().forEach(function(doc){doc.id=doc._id;db.dossiers.save(doc)})

```



## Implementation

* Frontend [Angular Material](https://material.angularjs.org/latest/)
* Backend [featherjs](http://feathersjs.com/)

