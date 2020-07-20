const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');

module.exports = {
    async index(request, response){
        try {
            const jobs = await connection('jobs')
                .innerJoin('departments','departments.id','=','jobs.department_id')
                .select(['jobs.id','jobs.department_id','jobs.name','departments.name']);
            return response.json(jobs);
        } catch (error) {
            return response.json(notifications.error.receiving_data);
        }
    },
};