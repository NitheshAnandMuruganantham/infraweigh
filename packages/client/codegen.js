const { config } = require("dotenv");
config();
module.exports = {
  schema: [
    {
      "http://localhost:8080/v1/graphql": {
        headers: {
          "x-hasura-admin-secret": "myadminsecretkey",
        },
      },
    },
  ],
  documents: "./**/*{.graphql,.gql}",
  overwrite: true,
  generates: {
    "./src/generated/generated.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
