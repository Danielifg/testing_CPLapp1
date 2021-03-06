const express = require('express');
const webpack = require('webpack');
const path = require('path');



const config = require('./webpack.config');

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err.message);
        return false;
    }
    console.log(`Express server running on port ${port}`);
})
