const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { prepare, commonMap } = require("./helpers");

const ObjectSchema = new Schema(
  {
    id: { type: String, required: true },
    instanceType: { type: String, required: true },
    type: { type: String, required: true },
    coordinates: { type: Array, required: true },

    title: { type: String, required: false },
    shortDescription: { type: String, required: false },
    fullDescription: { type: String, required: false },

    thumbnail: { type: String, required: false },
    images: { type: Object, required: false },

    street: { type: String, required: false },
    house: { type: String, required: false },
    noAddress: { type: Boolean, required: false },

    // circle
    radius: { type: Number, required: false },
  },
  { id: false }
);

const ObjectModel = mongoose.model("Object", ObjectSchema, "objects");

module.exports = {
  ObjectModel,
  prepare: (raw) => prepare(raw, commonMap),
};
