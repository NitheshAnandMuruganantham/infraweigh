const { config } = require('dotenv');
config();
module.exports = {
  schema: [
    {
      'https://infra-weigh.hasura.app/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_TOKEN,
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
