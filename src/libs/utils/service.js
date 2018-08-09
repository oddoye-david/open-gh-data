export default class Service {
  constructor(model) {
    this.model = model;
  }

  async list({
    limit, page, populate = [], sort = { name: 1 },
  } = {}) {
    let query = this.model.find({});

    if (limit) {
      query.limit(limit);
    }

    if (page) {
      query.skip((page - 1) * limit);
    }

    if (populate.length) {
      query = populate.reduce((queryCursor, populateField) => {
        queryCursor.populate(populateField);
        return queryCursor;
      }, query);
    }

    const items = await query.sort(sort).exec();

    return items;
  }

  async findById(id, populate = []) {
    let query = this.model.findById(id);

    if (populate.length) {
      query = populate.reduce((queryCursor, populateField) => {
        queryCursor.populate(populateField);
        return queryCursor;
      }, query);
    }

    const item = await query.exec();

    return item;
  }
}
