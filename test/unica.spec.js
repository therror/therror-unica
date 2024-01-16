'use strict';

const Therror = require('therror');
const UnicaError = require('../lib');

describe('UnicaError Errors', function() {
  it('should be able to create a UnicaError', function() {
    class Foo extends UnicaError('FOO', Therror.ServerError[404]) {}

    let err = new Foo();
    expect(err).to.be.instanceOf(Error);
    expect(err).to.be.instanceOf(Therror);
    expect(err).to.be.instanceOf(Foo);

    expect(err.unicaCode).to.be.eql('FOO');
    expect(err).to.respondTo('toPayload');
    expect(Object.keys(err)).to.be.eql(['unicaCode']);
  });

  it('should be able to return UnicaError payload', function() {
    class Foo extends UnicaError('FOO.BAR', Therror.ServerError[404]) {}

    let err = new Foo('Missing ${thing}', {thing: 'bar'});

    expect(err.toPayload()).to.be.eql({
      code: 'FOO.BAR',
      message: 'Missing bar',
    });
  });

  describe('Precreated UnicaError Errors', function() {
    it('should have precreated instances of all UnicaError standard', function() {
      expect(UnicaError).to.have.property('InvalidArgument');
      expect(UnicaError).to.have.property('FailedPrecondition');
      expect(UnicaError).to.have.property('OutOfRange');
      expect(UnicaError).to.have.property('Unauthenticated');
      expect(UnicaError).to.have.property('PermissionDenied');
      expect(UnicaError).to.have.property('NotFound');
      expect(UnicaError).to.have.property('Aborted');
      expect(UnicaError).to.have.property('AlreadyExists');
      expect(UnicaError).to.have.property('TooManyRequests');
      expect(UnicaError).to.have.property('DataLoss');
      expect(UnicaError).to.have.property('Internal');
      expect(UnicaError).to.have.property('NotImplemented');
      expect(UnicaError).to.have.property('Unavailable');
      expect(UnicaError).to.have.property('Timeout');
    });

    it('should be able to customize message for a precreated error', function() {
      class Foo extends Therror.WithMessage('This is foo', UnicaError.InvalidArgument) {}

      let err = new Foo();

      expect(err.toPayload()).to.be.eql({
        code: 'INVALID_ARGUMENT',
        message: 'This is foo',
      });
    });

    it('should use Therror default message with no one provided', function() {
      let err = new UnicaError.InvalidArgument();

      expect(err.toPayload()).to.be.eql({
        code: 'INVALID_ARGUMENT',
        message: 'Bad Request',
      });
    });

    it('InvalidArgument should have the unica and status code', function() {
      let err = new UnicaError.InvalidArgument();
      expect(err.unicaCode).to.be.equals('INVALID_ARGUMENT');
      expect(err.statusCode).to.be.equals(400);
    });

    it('FailedPrecondition should have the unica and status code', function() {
      let err = new UnicaError.FailedPrecondition();
      expect(err.unicaCode).to.be.equals('FAILED_PRECONDITION');
      expect(err.statusCode).to.be.equals(400);
    });

    it('OutOfRange should have the unica and status code', function() {
      let err = new UnicaError.OutOfRange();
      expect(err.unicaCode).to.be.equals('OUT_OF_RANGE');
      expect(err.statusCode).to.be.equals(400);
    });

    it('Unauthenticated should have the unica and status code', function() {
      let err = new UnicaError.Unauthenticated();
      expect(err.unicaCode).to.be.equals('UNAUTHENTICATED');
      expect(err.statusCode).to.be.equals(401);
    });

    it('PermissionDenied should have the unica and status code', function() {
      let err = new UnicaError.PermissionDenied();
      expect(err.unicaCode).to.be.equals('PERMISSION_DENIED');
      expect(err.statusCode).to.be.equals(403);
    });

    it('NotFound should have the unica and status code', function() {
      let err = new UnicaError.NotFound();
      expect(err.unicaCode).to.be.equals('NOT_FOUND');
      expect(err.statusCode).to.be.equals(404);
    });

    it('Aborted should have the unica and status code', function() {
      let err = new UnicaError.Aborted();
      expect(err.unicaCode).to.be.equals('ABORTED');
      expect(err.statusCode).to.be.equals(409);
    });

    it('AlreadyExists should have the unica and status code', function() {
      let err = new UnicaError.AlreadyExists();
      expect(err.unicaCode).to.be.equals('ALREADY_EXISTS');
      expect(err.statusCode).to.be.equals(409);
    });

    it('TooManyRequests should have the unica and status code', function() {
      let err = new UnicaError.TooManyRequests();
      expect(err.unicaCode).to.be.equals('TOO_MANY_REQUESTS');
      expect(err.statusCode).to.be.equals(429);
    });

    it('DataLoss should have the unica and status code', function() {
      let err = new UnicaError.DataLoss();
      expect(err.unicaCode).to.be.equals('DATA_LOSS');
      expect(err.statusCode).to.be.equals(500);
    });

    it('Internal should have the unica and status code', function() {
      let err = new UnicaError.Internal();
      expect(err.unicaCode).to.be.equals('INTERNAL');
      expect(err.statusCode).to.be.equals(500);
    });

    it('NotImplemented should have the unica and status code', function() {
      let err = new UnicaError.NotImplemented();
      expect(err.unicaCode).to.be.equals('NOT_IMPLEMENTED');
      expect(err.statusCode).to.be.equals(501);
    });

    it('Unavailable should have the unica and status code', function() {
      let err = new UnicaError.Unavailable();
      expect(err.unicaCode).to.be.equals('UNAVAILABLE');
      expect(err.statusCode).to.be.equals(503);
    });

    it('Timeout should have the unica and status code', function() {
      let err = new UnicaError.Timeout();
      expect(err.unicaCode).to.be.equals('TIMEOUT');
      expect(err.statusCode).to.be.equals(504);
    });

    it('Erros with status format should have the status property in body', function(){
      class Foo extends UnicaError('ERROR_CODE', UnicaError.InvalidArgument, true) {}

      let err = new Foo();

      expect(err.toPayload().status).to.be.eql(400);
    });

    it('Erros with no status format should not have the status property in body', function(){
      class Foo extends UnicaError('ERROR_CODE', UnicaError.InvalidArgument, false) {}

      let err = new Foo();

      expect(err.toPayload().status).to.be.eql(undefined);

      class Foo2 extends UnicaError('ERROR_CODE', UnicaError.InvalidArgument) {}

      err = new Foo2();

      expect(err.toPayload().status).to.be.eql(undefined);
    });

  });
});
