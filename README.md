<p align="center">
<img src="https://user-images.githubusercontent.com/924985/89710534-53057b00-d984-11ea-852f-3535e0d8b020.png" width="156.5px">
</p>

<p align="center">
AllSpots aims to be the personal project I've always wanted to do and never ended up doing it. A catalog of parkour spots around the world, with good descriptions and attributes to help athlestes find the best location when visiting new countries, new cities, new places in general. 
</p>

![Light Theme](https://user-images.githubusercontent.com/924985/91487388-f247cf00-e8ad-11ea-9933-ba03bac8a74d.png)

## Table of contents

- [Technologies](https://github.com/rafmst/allspots-api#technologies)
- [Documentation](https://github.com/rafmst/allspots-api#documentation)
- [License](https://github.com/rafmst/allspots-api#license)

## Technologies

| Technology  | Version |
|---|---|
| Typescript | 3.9.7 |
| Koa | 2.13.0 |
| Mongo | 4.4.0 |

## Documentation

### Authentication

Authenticate and register new users on the application.

#### Register user

```bash
POST https://allspots-api.herokuapp.com/users/register
```

This method allows guest users to register in the application and gain access to the list of spots and all the information/features in the app.

**Body Parameters**

| Field | Type | Description |
|---|---|---|
| name | string | Name of the user |
| email | string | Email to confirm identity |
| password | string | Strong password |

**Response**

*200: 0K*
Returns the newly registered user without the password field and the role id for normal users.

```js
{
  "content": {
    "user": {
      "_id": "g0j34908ffj3489fskjdf",
      "name": "FirstName LastName",
      "email": "example@email.com",
      "role": "9483fjf023jdf9823"
    }
  }
}
```

#### Authenticate

```bash
POST https://allspots-api.herokuapp.com/users/authentica
```

Authenticate a user with email and password.

**Body Parameters**

| Field | Type | Description |
|---|---|---|
| email | string | Email to confirm identity |
| password | string | Strong password |

**Response**

*200: 0K*
Returns the public user content and a unique token.

```js
{
  "content": {
    "user": {
      "_id": "g0j34908ffj3489fskjdf",
      "name": "FirstName LastName",
      "email": "example@email.com",
      "role": "9483fjf023jdf9823"
    },
    "token": "eyJhbGciOiJIUzI1NiI23424VCJ9.eyJ1c2VyIjp7I234WZyB0HMOeJjn190"
  }
}
```

### Filters

Everything related to listing, adding, deleting and editing filters.

#### Get all filters

```bash
GET https://allspots-api.herokuapp.com/filters
```

This endpoint allows you to get the list of filters by type of filter. This is useful to show a list of filters available to the user.

**Response**

*200: 0K*
Filters successfully retrieved.

```js
{
  "content": {
    "accesses": [
      {
        "_id": "5f0f540dee1b9b1a8c1fd3a2",
        "title": "Public",
        "slug": "public"
      },
      { ... }
    ],
    "categories": [
      {
        "_id": "5f0f540dee1b9b1a8c1fd397",
        "title": "Playgrounds",
        "slug": "playgrounds"
      },
      { ... }
    ],
    "sizes": [
      {
        "_id": "5f0f540dee1b9b1a8c1fd39e",
        "title": "Small",
        "slug": "small"
      },
      { ... }
    ],
    "skills": [
      {
        "_id": "5f0f540dee1b9b1a8c1fd39c",
        "title": "Advanced",
        "slug": "advanced"
      },
      { ... }
    ]
  }
}
```

## License

MIT License

Copyright (c) 2020 AllSpots by Rafael Morais

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
