const accounts = require('./accounts');

exports.authenticate = (username, password) => {
  const user = accounts.find(account => 
    account.username === username && account.password === password
  );
  if (user) {
    return user.id;
  }
  return undefined;
};

exports.getName = id => {
  const user = getUserById(id);
  if (user) {
    return user.name;
  }
  return undefined;
}

exports.getFood = id => {
  const user = getUserById(id);
  if (user) {
    return user.food;
  }
  return undefined;
}

exports.getMovie = id => {
  const user = getUserById(id);
  if (user) {
    return user.movie;
  }
  return undefined;
}

function getUserById(id) {
  return user = accounts.find(account => {
    return parseInt(account.id) === parseInt(id);
  });
}