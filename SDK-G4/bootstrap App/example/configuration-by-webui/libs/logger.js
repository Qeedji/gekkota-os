(function () {
  "use strict";

  function Logger(name) {
    this._logService = window.log4Service ? window.log4Service.getLogger(name) : (window.console ? window.console : null);
  }
  Logger.prototype = {
    debug: function (message) {
      this._log(message);
    },
    error: function (message) {
      this._log(message, true);
    },
    errorEx: function (exception) {
      this._log("Exception line: " + exception.lineNumber + ", value: " + exception.message, true);
    },
    clearConsole: function () {
      this._getHtmlConsole().innerHTML = "";
    },
    _log: function (message, isError) {
      if (this._logService) {
        if (isError) {
          this._logService.error(message, null);
        } else {
          this._logService.debug(message, null);
        }
      }
    },
  };
  window.Logger = Logger;
})();