set -e

mongo <<EOF
use admin

db = db.getSiblingDB("admin");

// move to the admin db - always created in Mongo
db.auth("ibm", "dao");

// log as root admin if you decided to authenticate in your docker-compose file...
db = db.getSiblingDB("ibm");

// create and move to your new database

db.createUser({
  user: '$APP_USERNAME',
  pwd: '$APP_PASSWORD',
  roles: [
    {
      role: "dbOwner",
      db: "ibm",
    },
  ],
});

// NOTE: must be plural!
db.createCollection("persons");
db.createCollection("groups");
db.createCollection("colors");
EOF
