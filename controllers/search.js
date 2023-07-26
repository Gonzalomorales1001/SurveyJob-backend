const { request, response } = require('express');

const search = async ( req = request, res=response) => {
    res.json({
        "msg": "Search working",
        "collection-requested": req.params.collection
    })
}

module.exports = {
    search
}