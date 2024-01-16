# therror-unica
Unica Errors and toolbelt for creating them

[![npm version](https://badge.fury.io/js/therror-unica.svg)](http://badge.fury.io/js/therror-unica)
[![Build Status](https://travis-ci.org/therror/therror-unica.svg)](https://travis-ci.org/therror/therror-unica)
[![Coverage Status](https://coveralls.io/repos/therror/therror-unica/badge.svg?branch=master)](https://coveralls.io/r/therror/therror-unica?branch=master)
![Typescript definitions](https://img.shields.io/badge/TypeScript%20Definition-.d.ts-blue.svg)

It's written in ES6, for node >= 4

These Errors are based in [Therror.ServerError](https://github.com/therror/therror#server-error-classes), hide implementation details and confidential information for the `5XX` automatically, and use default HTTP Error messages when no specific one is provided.

## Installation 
```bash
 npm install --save therror therror-unica
```

## Usage

```js
const Therror = require('therror');
const UnicaError = require('therror-unica');

let arg = 'id';
let err = new UnicaError.InvalidArgument(`Missing argument ${arg}`);
err.unicaCode; // INVALID_ARGUMENT
err.toPayload();
/*
{
  "code": "INVALID_ARGUMENT",
  "message": "Missing argument id"
}
*/
```

Unica Errors Correspondece table

| statusCode | unicaCode | UnicaError class |
| --- | --- | --- |
| 400 | INVALID_ARGUMENT | `UnicaError.InvalidArgument` |
| 400 | FAILED_PRECONDITION | `UnicaError.FailedPrecondition` |
| 400 | OUT_OF_RANGE | `UnicaError.OutOfRange` |
| 401 | UNAUTHENTICATED | `UnicaError.Unauthenticated` |
| 403 | PERMISSION_DENIED | `UnicaError.PermissionDenied` |
| 404 | NOT_FOUND | `UnicaError.NotFound` |
| 409 | ABORTED | `UnicaError.Aborted` |
| 409 | ALREADY_EXISTS | `UnicaError.AlreadyExists` |
| 429 | TOO_MANY_REQUESTS | `UnicaError.TooManyRequests` |
| 500 | DATA_LOSS | `UnicaError.DataLoss` |
| 500 | INTERNAL | `UnicaError.Internal` |
| 501 | NOT_IMPLEMENTED | `UnicaError.NotImplemented` |
| 503 | UNAVAILABLE | `UnicaError.Unavailable` |
| 504 | TIMEOUT | `UnicaError.Timeout` |

## Create your own API Specific Errors
```js
// Create your own Unica Errors based on Therror.ServerErrors using the UnicaError Mixin
class PaymentRequired extends UnicaError('PAYMENTS.NOT_ENOUGH_BALANCE', Therror.ServerError.PaymentRequired) {}
// or specify the statusCode instead of the class
class PaymentRequired extends UnicaError('PAYMENTS.NOT_ENOUGH_BALANCE', Therror.ServerError[402]) {}
// or go wild with the mixin party
class PaymentRequired extends UnicaError('PAYMENTS.NOT_ENOUGH_BALANCE', Therror.ServerError({
  statusCode: 402,
  level: 'info',
})) {}

let err = new PaymentRequired();
err.toPayload();
/*
{
  "code": "PAYMENTS.NOT_ENOUGH_BALANCE",
  "message": "Payment Required"
}
*/
```

### Tips

**Create your custom error classes**
```js
class InvalidHeader extends UnicaError.InvalidArgument {}
let err = new InvalidHeader('The header "X-Fwd-To" is invalid');
err.toPayload();
/*
{
  "code": "INVALID_ARGUMENT",
  "message": "The header "X-Fwd-To" is not valid"
}
*/
```

**Create errors with a static kwnon message**
```js
class InvalidHeader extends Therror.WithMessage('The header "${header}" is not valid', UnicaError.InvalidArgument) {}

let err =  new InvalidHeader({header: 'X-Fwd-To'});
err.toPayload();
/*
{
  "code": "INVALID_ARGUMENT",
  "message": "The header "X-Fwd-To" is not valid"
}
*/
```

**Add Causes to your errors**

If your API service depends on other services, you should not blindly propagate errors from those services to your clients. When translating errors, adjust the party responsible for the error. For example, a server that receives an INVALID_ARGUMENT error from another service should propagate an INTERNAL to its own caller.


```js
try {
  throw Error('Boom!');
} catch(err) {
  throw new UnicaError.Internal(err, `Service Call failed`);
}
```

**Don't forget to log our errors**

Remember, hide implementation details and confidential information in the payload, but log it for forensics. Hiding is automatic for `5XX` errors

```js
// Set your favourite logger (defaults to console)
Therror.Loggable.logger = require('logops');  // but logops is a logger designed to log error causes and properties 

let interestingData = { ... };
let err = new UnicaError.Internal(cause, 'Database error', { interestingData });
err.log();
// will log the cause, the stacktrace, the original provided message and `interestingData`
err.toPayload();
/*
{
  "code": "INTERNAL",
  "message": "Internal Server Error"
}
*/
```

**Customize your errors as much as you want**

You can select options like: the error code, adding status to the body of your Error, etc.

```js
class InvalidUser extends UnicaError('INVALID_USER', UnicaError.InvalidArgument, true) {}
let err = new InvalidUser("The user is not valid");
err.toPayload();
/*
{
  "code": "INVALID_USER",
  "message": "The user is not valid",
  "status": 400
}
*/
```

## Peer Projects
* [therror](https://github.com/therror/therror): The Error utility
* [therror-connect](https://github.com/therror/therror-connect): Connect/Express error handler
* [serr](https://github.com/therror/serr): Error serializer to Objects and Strings

## LICENSE

Copyright 2017 [Telefónica I+D](http://www.tid.es)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
