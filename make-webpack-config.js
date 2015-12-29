import webpack from 'webpack';
import path from 'path';

const makeWebpackConfig = (entry) => {
    const binModulesDir = path.join(__dirname, 'node_modules');

    return {
        devtool: 'source-map',
        target: 'web',
        entry: {
            app: [
                '.' + entry,
            ],
        },
        output: {
            path: process.cwd() + '/js-stuff',
            pathInfo: true,
            publicPath: '/',
            filename: 'bundle.js',
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            require.resolve('babel-preset-es2015'),
                            require.resolve('babel-preset-react'),
                        ],
                    },
                    exclude: /node_modules/,
                },
            ],
            noParse: /\.min\.js/,
        },
        resolveLoader: {
            root: binModulesDir,
        },
        resolve: {
            extentions: ['js', 'jsx'],
            fallback: [
                binModulesDir,
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                },
            }),
        ],
    };
};

export default makeWebpackConfig;
