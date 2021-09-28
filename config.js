// Autodesk Forge configuration
module.exports = {
    // Set environment variables or hard-code here
    credentials: {
        client_id: "NDxNRr7Q1zVqBANwbtuMakZeeKq86Yfi",
        client_secret: "4FeaFRjvGcN5RHGd",
        callback_url: "http%3A%2F%2Flocalhost%3A3000%2Fcallback%2Foauth"
    },
    scopes: {
        // Required scopes for the server-side application
        internal: ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'],
        // Required scope for the client-side viewer
        public: ['viewables:read']
    }
};