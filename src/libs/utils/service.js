export default class Service {
  constructor(model) {
    this.model = model;
  }

  async list(limit, page, populate = []) {
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

    const items = await query.exec();

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
