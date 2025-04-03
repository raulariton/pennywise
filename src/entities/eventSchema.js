const EntitySchema = require("typeorm").EntitySchema;

const User = new EntitySchema({
  name: "users",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "integer",
      generated: true,
    },
    name: {
      type: "character varying",
    },
    email: {
      type: "character varying",
    }
  },
});

module.exports = User