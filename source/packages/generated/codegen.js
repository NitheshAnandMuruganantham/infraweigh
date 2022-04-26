const { config } = require('dotenv');
config();
module.exports = {
  schema: [
    {
      'https://infra-weigh.herokuapp.com/v1/graphql': {
        headers: {
          'x-hasura-admin-secret':
            'MhkFsJZvLCjCTsFicfR6itE0EY7OOC2kkQRBc41EyMgosT8P6qHLq4125hToRdus',
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
