const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');

module.exports = {
    async create(request, response){
        try {
            const department = request.body;

            //Checking if the department is already added
            const department_already_added = await connection('departments')
                .where('name', department)
                .select('id')
                .first();
            if(department_already_added){
                return response.json({
                    message: notifications.alert.department_year_already_added
                });
            }
            //insert data
            const department_inserting = await connection('departments')
                .insert(department);

            //check if data was added
            if(!department_inserting){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            } else {
                console.log('[bknd server] New Department: ' + notifications.success.insert_data);
                return response.json({
                    message: notifications.success.insert_data,
                    data: department_inserting
                });
            }
        } catch (error) {
            return response.json(notifications.error.insert_data);
        }
    },
};