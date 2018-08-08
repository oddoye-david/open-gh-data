export default class Service {
  constructor(model) {
    this.model = model;
  }

  async list(limit, page) {
    const query = this.model.find({});

    if (limit) {
      query.limit(limit);
    }

    if (page) {
      query.skip((page - 1) * limit);
    }

    const items = await query.exec();

    return items;
  }

  async findById(id) {
    const item = await this.model.findById(id);
    return item;
  }
}
