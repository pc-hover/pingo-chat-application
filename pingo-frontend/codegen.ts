import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:3001/graphql',
    documents: "src/**/*.ts",
    generates: {
        'src/gql/': {
            preset: 'client',
            plugins: [],
            config: {
                useTypeImports: true,
                scalars: {
                    DateTime: 'string',
                }
            },
            presetConfig: {
                fragmentMasking: false
            }
        },
    },
};

export default config;