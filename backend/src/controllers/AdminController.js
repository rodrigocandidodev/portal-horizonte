module.exports = {
    async index(request, response){
        return response.json({
            message: "Admins page"
        });
    }
}