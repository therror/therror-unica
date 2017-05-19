/**
 * @license
 * Copyright 2017 Telefónica I+D
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Therror = require('therror');

function UnicaError(code, Base) {
  return class extends Base {
    constructor(cause, msg, props) {
      super(cause, msg, props);
      // Set the unicaCode in the constructor to be enumerable and therefore printed in the logs
      this.unicaCode = code;
    }

    // Overried the toPayload method in the ServerError to return the UNICA payload
    toPayload() {
      return {
        code: this.unicaCode,
        message: this.getPayloadMessage(),
      };
    }
  };
}

UnicaError.InvalidArgument = class InvalidArgument extends UnicaError('INVALID_ARGUMENT', Therror.ServerError[400]) { };
UnicaError.FailedPrecondition = class FailedPrecondition extends UnicaError('FAILED_PRECONDITION', Therror.ServerError[400]) { };
UnicaError.OutOfRange = class OutOfRange extends UnicaError('OUT_OF_RANGE', Therror.ServerError[400]) { };
UnicaError.Unauthenticated = class Unauthenticated extends UnicaError('UNAUTHENTICATED', Therror.ServerError[401]) { };
UnicaError.PermissionDenied = class PermissionDenied extends UnicaError('PERMISSION_DENIED', Therror.ServerError[403]) { };
UnicaError.NotFound = class NotFound extends UnicaError('NOT_FOUND', Therror.ServerError[404]) { };
UnicaError.Aborted = class Aborted extends UnicaError('ABORTED', Therror.ServerError[409]) { };
UnicaError.AlreadyExists = class AlreadyExists extends UnicaError('ALREADY_EXISTS', Therror.ServerError[409]) { };
UnicaError.TooManyRequests = class TooManyRequests extends UnicaError('TOO_MANY_REQUESTS', Therror.ServerError[429]) { };
UnicaError.DataLoss = class DataLoss extends UnicaError('DATA_LOSS', Therror.ServerError[500]) { };
UnicaError.Internal = class Internal extends UnicaError('INTERNAL', Therror.ServerError[500]) { };
UnicaError.NotImplemented = class NotImplemented extends UnicaError('NOT_IMPLEMENTED', Therror.ServerError[501]) { };
UnicaError.Unavailable = class Unavailable extends UnicaError('UNAVAILABLE', Therror.ServerError[503]) { };
UnicaError.Timeout = class Timeout extends UnicaError('TIMEOUT', Therror.ServerError[504]) { };

module.exports = UnicaError;
module.exports.default = UnicaError;
