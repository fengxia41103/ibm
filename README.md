# Deploy

`docker-compose up`

| Service       | Port |
|---------------|------|
| api           | 8111 |
| frontend      | 8112 |
| mongo-express | 8113 |

# Load initial data

Put data files in `/data` folder. Data format is expected to be:

```json
{
  groupName: {
    personName: colorName
  },
  anotherGroup: {
    ...
  },
  ...
}
```

You can load multiple data set this way. DB document creation follows
the constraints listed below. It's safe to use duplicate name of
group's, color's or person's name in multiple files cause each value
will only be created once in initialization.

# Constraints

Data model/schema follows these constraints:

| Index | Model   | Constraint                                                                 |
|-------|---------|----------------------------------------------------------------------------|
| C.1   | `Group` | Name is unique globally                                                    |
| C.2   | `Color` | Name is unique globally                                                    |
| C.3   | `User`  | Name is unique globally                                                    |
| C.4   | `Group` | Name is case sensitive, eg. "This" and "this" will be two different groups |
| C.5   | `Color` | Name is saved in all capital letters, eg. `Red` will be `RED`              |
| C.6   | `User`  | Name is case sensitive                                                     |

# Configs

## DB credentials

There are essentially two sets of DB credentials: DB admin, and
application users. The application user has only access to the
application DB. These credentials need to be consistent across
services.

For example, if we choose:

| For         | User Name | Password |
|-------------|-----------|----------|
| DB admin    | ibm       | dao      |
| application | fengxia   | natalie  |

All configs are specified in `docker-compose.yml`. Names are self-explanatory.

In `mongo` service:

```yaml
environment:
  MONGO_INITDB_ROOT_USERNAME: ibm
  MONGO_INITDB_ROOT_PASSWORD: dao
  APP_USERNAME: fengxia
  APP_PASSWORD: natalie
```

In `mongo-express` service:

```yaml
environment:
  ME_CONFIG_MONGODB_ADMINUSERNAME: ibm
  ME_CONFIG_MONGODB_ADMINPASSWORD: dao
  ME_CONFIG_MONGODB_URL: mongodb://ibm:dao@mongo:27017/
```

In `backend` service:

```yaml
environment:
  APP_USERNAME: fengxia
  APP_PASSWORD: natalie
```

# Wishlist

1. Default database name is `ibm`. This is not yet configurable
   through `docker-compose`.
2. No test.
3. When adding a user, duplicate name will be blocked. Should allow a
   `update`/replacement of person's color and group if the person
   exists.
4. When adding a user, change the user name input to the color if the
   person exists.
5. No auth in backend. API is public.

# Credits

1. Backend is based on [example project on
   github](https://github.com/bezkoder/node-express-mongodb)
2. Frontend is based on [my stock analysis project](https://github.com/fengxia41103/stock)
