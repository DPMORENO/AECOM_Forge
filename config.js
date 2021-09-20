// Autodesk Forge configuration
module.exports = {
    // Las variables de entorono de trabajo.
    credentials: {
        client_id: process.env.FORGE_CLIENT_ID,
        client_secret: process.env.FORGE_CLIENT_SECRET,
        callback_url: process.env.FORGE_CALLBACK_URL
    },
    scopes:  ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write']
};
