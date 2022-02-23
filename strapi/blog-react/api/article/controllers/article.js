const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   * @return {Array}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.article.findOne({ slug }, [
      'category',
      'author',
      'author.picture',
      'image',
      'comments',
      'comments.user',
    ]);
    return sanitizeEntity(entity, { model: strapi.models.article });
  },
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.article })
    );
  },
};
