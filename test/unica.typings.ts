import UnicaError from '../lib';
import Therror from 'therror';

let err = new UnicaError.InvalidArgument();
err.unicaCode;
err.toPayload();

class PaymentRequired extends UnicaError('PAYMENTS.NOT_ENOUGH_BALANCE', Therror.ServerError.PaymentRequired) {}

let fooErr = new PaymentRequired();
fooErr.unicaCode;

