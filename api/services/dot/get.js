const { DotModel, prepare } = require("../../db/dot.model");

module.exports = async function (fastify, opts) {
  fastify.register(registerRoutes);
};

async function registerRoutes(fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/dots/:dot",
    handler: get,
  });

  async function get(request, reply) {
    let dotId = request.params.dot;

    try {
      const raw = await DotModel.findOne({
        id: { $regex: dotId, $options: "i" },
      }).select({ _id: 0, __v: 0 });

      if (raw) {
        reply.type("application/json").code(200);
        return prepare(raw);
      } else {
        reply.type("application/json").code(404);
        return { error: `Unable to get dot: dot ${dotId} was not found` };
      }
    } catch (e) {
      reply.type("application/json").code(500);
      console.error(e);
      return { error: `Unable to get dot` };
    }
  }
}
