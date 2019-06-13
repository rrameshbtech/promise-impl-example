const MyPromise = function(handler) {
  let fullfilmentListener = null;
  let rejectionListener = null;

  const _resolve = function(args) {
    fullfilmentListener && fullfilmentListener(args);
  };
  const _reject = function(args) {
    rejectionListener && rejectionListener(args);
  };

  if (handler) {
    process.nextTick(() => {
      try {
        handler(_resolve, _reject);
      } catch (error) {
        _reject(error);
      }
    });
  }

  function thenHandler(_fullFilmentListener, _rejectionListener) {
    if (_fullFilmentListener) {
      fullfilmentListener = _fullFilmentListener;
    }
    if (_rejectionListener) {
      rejectionListener = _rejectionListener;
    }
  }

  function catchHandler(_rejectionListener) {
    thenHandler(null, _rejectionListener);
  }

  return {
    then: thenHandler,
    catch: catchHandler
  };
};

MyPromise.resolve = function(arg) {
  return new MyPromise(resolve => {
    resolve(arg);
  });
};

MyPromise.reject = function(arg) {
  return new MyPromise((resolve, reject) => {
    reject(arg);
  });
};

module.exports = MyPromise;
