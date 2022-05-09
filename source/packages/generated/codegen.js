const { config } = require('dotenv');
config();
module.exports = {
  schema: [
    {
      'http://localhost:8080/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'myadminsecretkey',
        },
      },
    },
  ],
  documents: './**/*{.graphql,.gql}',
  overwrite: true,
  generates: {
    './packages/generated/src/lib/generated.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './packages/generated/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
