module.exports = app => {
    app.get('/account', (req, res) => {
        // 1) Get user information from User model
        // 2) Return operation status and data
    });

    app.post('/account/delete', (req, res) => {
        // 1) Get User ID from accessToken
        // 2) Delete User from User model
        // 3) Delete all connected flights from Flight model
        // 4) Return operation result
    });
};