var mapping = {};

function register(name, factory) {
  mapping[name] = factory;
}

function create(name, options) {
  return new mapping[name](options);
}

module.exports = {
  register: register,
  create: create
};
