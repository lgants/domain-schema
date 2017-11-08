## Domain Schema

[![npm version](https://badge.fury.io/js/domain-schema.svg)](https://badge.fury.io/js/domain-schema) [![Twitter Follow](https://img.shields.io/twitter/follow/sysgears.svg?style=social)](https://twitter.com/sysgears)

Domain Schema is a set of packages lets you design you application using Domain Driven Design Principles.
You create your schema with any fields your application needs. 
Then use them as a single source of truth in your application to generate database schemas, forms, GraphQL types, etc.
`domain-schema` package tries to help you with this, not stay on your way, by imposing minimal limitations on the shape
of domain schemas, not the fields and the meaning you can use.

Example Domain Schema using ES6 syntax:
```js
class AuthCertificate extends Schema {
  serial = {
    type: String,
    unique: true
  };
}

class AuthFacebook extends Schema {
  fbId = {
    type: String,
    unique: true
  };
  displayName = {
    type: String,
    optional: true
  };
}

class UserProfile extends Schema {
  firstName = {
    type: String,
    optional: true
  };
  lastName = {
    type: String,
    optional: true
  };
  fullName = {
    type: String,
    optional: true,
    transient: true
  };
}

class UserAuth extends Schema {
  __ = { transient: true };
  certificate = {
    type: AuthCertificate,
    optional: true
  };
  facebook = {
    type: AuthFacebook,
    optional: true
  };
}

export const User = new DomainSchema(
  class User extends Schema {
    id = DomainSchema.Integer;
    username = {
      type: String,
      unique: true
    };
    email = {
      type: String,
      unique: true
    };
    password = {
      type: String,
      private: true
    };
    role = {
      type: String,
      default: 'user'
    };
    isActive = {
      type: Boolean,
      default: false,
      optional: true
    };
    auth = {
      type: UserAuth,
      optional: true
    };
    profile = {
      type: UserProfile,
      optional: true
    };
  }
);
```

## Installation

```bash
npm install -g domain-schema
```

## License
Copyright © 2017 [SysGears INC]. This source code is licensed under the [MIT] license.

[MIT]: LICENSE
[SysGears INC]: http://sysgears.com