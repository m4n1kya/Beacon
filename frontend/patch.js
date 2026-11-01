const fs = require('fs');

const origSync = fs.readlinkSync;
fs.readlinkSync = function(p, opts) {
  try {
    return origSync.apply(this, arguments);
  } catch(e) {
    if (e.code === 'EISDIR' || e.code === 'UNKNOWN') {
      const err = new Error(`EINVAL: invalid argument, readlink '${p}'`);
      err.code = 'EINVAL';
      err.errno = -4071;
      err.syscall = 'readlink';
      err.path = p;
      throw err;
    }
    throw e;
  }
};

const orig = fs.readlink;
fs.readlink = function(p) {
  const cb = arguments[arguments.length - 1];
  if (typeof cb === 'function') {
    arguments[arguments.length - 1] = function(err, link) {
      if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
        const fakeErr = new Error(`EINVAL: invalid argument, readlink '${p}'`);
        fakeErr.code = 'EINVAL';
        fakeErr.errno = -4071;
        fakeErr.syscall = 'readlink';
        fakeErr.path = p;
        return cb(fakeErr);
      }
      return cb.apply(this, arguments);
    };
  }
  return orig.apply(this, arguments);
};

const origPromises = fs.promises.readlink;
if (origPromises) {
  fs.promises.readlink = async function(p, opts) {
    try {
      return await origPromises.apply(this, arguments);
    } catch(e) {
      if (e.code === 'EISDIR' || e.code === 'UNKNOWN') {
        const err = new Error(`EINVAL: invalid argument, readlink '${p}'`);
        err.code = 'EINVAL';
        err.errno = -4071;
        err.syscall = 'readlink';
        err.path = p;
        throw err;
      }
      throw e;
    }
  };
}
