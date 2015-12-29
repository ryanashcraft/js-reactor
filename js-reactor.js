import webpack from 'webpack';
import express from 'express';
import { execFile } from 'child_process';
import flow from 'flow-bin';
import async from 'async';

import makeWebpackConfig from './make-webpack-config.js';
const app = express();
const expressPort = 8000;

app.use('/js-stuff', express.static(process.cwd() + '/js-stuff'));

const runFlow = (callback) => {
    const options = {
        cwd: process.cwd(),
    };

    execFile(flow, ['check'], options, (err, stdout) => {
        if (err) {
            callback(stdout);
            return;
        }

    	callback(null, stdout);
    });
};

const runWebpack = (path) => (callback) => {
    const webpackConfig = makeWebpackConfig(path);
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
        if (err) {
            callback(err);

            return;
        } else if (stats.hasErrors()) {
            const { errors } = stats.toJson({ errorDetails: true });
            callback(errors.join('\n'));

            return;
        }

        callback();
    });
};

app.get('/:path', (req, res) => {
    console.log(`Accepted request: ${req.path}`);
    const tasks = [
        runFlow,
        runWebpack(req.path),
    ];

    async.series(tasks, (err, results) => {
        if (err) {
            console.error(err);
            res.write(err);
            res.status(500);
            res.end();

            return;
        }

        res.write(`<body><script src="http://localhost:${expressPort}/js-stuff/bundle.js"></script></body>`);
        res.end();
    });
});

const server = app.listen(expressPort, () => {
    const port = server.address().port;
    console.log('js-reactor 1.0.0');
    console.log(`Listening on port ${port}`);
});
