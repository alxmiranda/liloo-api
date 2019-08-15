'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IsValidTime = exports.SetTimeEncrypt = undefined;

var _password = require('./password');

var SetTimeEncrypt = function setTime() {

    var date = new Date();
    var tempo = 1 * 60 * 60000;

    var finalTime = (0, _password.Encrypt)((date.getTime() + tempo).toString());

    return finalTime;
};

var IsValidTime = function IsValidTime(encryptedText) {

    var isValidTime = false;

    var date = new Date();

    var momomentoAnterior = parseInt((0, _password.Decrypt)(encryptedText), 10);

    var momentoAtual = parseInt(date.getTime(), 10);

    if (momomentoAnterior > momentoAtual) {
        isValidTime = true;
    }

    return isValidTime;
};

exports.SetTimeEncrypt = SetTimeEncrypt;
exports.IsValidTime = IsValidTime;
//# sourceMappingURL=tempoAcesso.js.map