export const utilService = {
  makeId,
  loadFromSessionStorage,
  saveToSessionStorage,
};
function makeId(length = 8) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function loadFromSessionStorage(key) {
  var val = sessionStorage.getItem(key);
  return val ? JSON.parse(val) : null;
}

function saveToSessionStorage(key, val) {
  if (!val._id) val._id = makeId();
  sessionStorage[key] = JSON.stringify(val);
  return val;
}
