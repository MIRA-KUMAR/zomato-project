const axios = require('axios');

module.exports = async (req, res, next) => {
    const { data } = await axios.get('http://localhost:3001/introspect', {
        headers: {
            authorization: `Bearer ${ req.cookies.auth }`,
        }
    });

    if (data.success) {
        return next();
    }

    return res.send({
        success: false,
        value: null,
        error: 'UnAuthorized',
    });
}