<div align="center">
  <img src="https://tschleuss.github.io/mocker-js/assets/logo.svg" width="300"/>
  <p>Faker.js factory that helps you generate mock data for testing based on your project's models.</p>
</div>

## Motivation

Have you ever got your self looking at test files and wondering:
> There's must be a better way to handle and reuse all those enormous mock objects

Then I got you covered, as that was the motivation behind `mocker-js`.

I was tired of seeing huge mock objects being created all over the place, most of them having the same structure and properties.

If we spend time thinking about structuring and reusing code, functions, components, why shouldn't we take some time to properly organize your tests as well?


## Installation

Installing and using `mocker-js` is easy, you can use you preferable package manager, such as `npm`:

```shell
npm install mocker-js --save-dev
```

or `yarn`:

```shell
yarn add mocker-js -D
```

## Basic example

To get you up and running in no time, here as some basic examples of how to use `mocker-js`.

If in you project you have for example, a classic `User` model, and you need to mock it, below you can se a few examples of how to do it.

### Generating one mocked User

```js
import { objectFactory } from 'mocker-js'; // <- Import mocker-js
import type { User } from "my/user/type/model";

/**
 * Create a user Factory with all its properties.
 * It's preferable to use faker to generate random data,
 * but you can always call internal functions, use static data,
 * define static values and so on..
 */
const UserFactory = objectFactory<User>((faker) => ({
  id: fake.datatype.uuid(),
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  address: faker.address.streetAddress(),
  age: faker.datatype.number({ max: 100 }),
  phone: faker.phone.phoneNumber(),
}));

// Then, whenever you need to mock a User model again, you can just call:
const mockUser = UserFactory.create();
```

### Generating a list of mocked User

```js
import { UserFactory } from 'my/factory/of/user'; // <- Import you factory to reuse it

// Creates and return a list containing 5 unique users.
const mockUserList = UserFactory.createMany(5);
```

## Generating a mock User with specific properties

Sometimes your `function` or `component` needs a subset of a object, like a typescript `Partial<User>`. In these cases you can also use your `UserFactory` as describe which properties do you want it to generate.

```js
import { UserFactory } from 'my/factory/of/user';

// Creates and return a partial User with just firstname and age.
const model = UserFactory.createAndPick(["firstname", "age"]);
```

## Generating a new custom mock User with a fixed value for one or more properties.

Sometimes you need a User mock with a custom value instead of a random one. 
Let's say you are testing a new parental control for you project, and constantly need to
create users with a specific age.

```js
import { UserFactory } from 'my/factory/of/user';

// Creates and return a new User factory having one or more custom fields.
const ChildModel = UserFactory.assign(faker => ({
  age: faker.datatype.number({ max: 10 }),
}));

const model = ChildModel.create();
```

## Generating consistent mock Users

Sometimes you want your mocked object to be the same across multiple test runs, like for snapshopt testing.

```js
import { UserFactory } from 'my/factory/of/user';

/**
 * Creates and return a new mocked user for based on the seed.
 * Every user created for the same seed will be equal.
 */
const model = UserFactory.seed(666).create();
```