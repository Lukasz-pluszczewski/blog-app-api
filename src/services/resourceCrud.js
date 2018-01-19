import _ from 'lodash';
import getDb from 'services/DbService';
import defaults from 'models/defaults';

const resource = (db, name) => db.get(name);

const mapValues = data => (value, key) => {
  if (_.isFunction(value)) {
    return value(data[key]);
  }
  if (_.isPlainObject(value)) {
    return _.mapValues(value, mapValues(data));
  }
  return value;
};
const mergeDefaults = (data, defaults = {}) => {
  const defaultsMapped = _.mapValues(defaults, mapValues(data));
  return _.merge({}, defaultsMapped, data);
};

const resourceCrud = {
  get(resourceName, cb = wrapper => wrapper, returnWrapper = false) {
    const wrapper = cb(resource(resourceCrud.db, resourceName));
    return returnWrapper ? wrapper : wrapper.value();
  },
  getById(resourceName, id, cb = wrapper => wrapper, returnWrapper = false) {
    const wrapper = cb(resource(resourceCrud.db, resourceName).getById(id));
    return returnWrapper ? wrapper : wrapper.value();
  },
  create(resourceName, data, returnWrapper = false) {
    const wrapper = resource(resourceCrud.db, resourceName)
      .insert(mergeDefaults(data, defaults[resourceName]));

    return returnWrapper ? wrapper : wrapper.write();
  },
  replace(resourceName, id, data, returnWrapper = false) {
    const wrapper = resource(resourceCrud.db, resourceName)
      .replaceById(id, mergeDefaults(data, defaults[resourceName]));

    return returnWrapper ? wrapper : wrapper.write();
  },
  update(resourceName, id, data, returnWrapper = false) {
    const wrapper = resource(resourceCrud.db, resourceName).updateById(id, data);
    return returnWrapper ? wrapper : wrapper.write();
  },
  delete(resourceName, id, returnWrapper = false) {
    const wrapper = resource(resourceCrud.db, resourceName).removeById(id);
    return returnWrapper ? wrapper : wrapper.write();
  },
  db: getDb(),
};

export default resourceCrud;
