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
    async index(request, response){
        try {
            const departments = await connection('departments')
                .select(['id','name']);
            
            return response.json(departments);
        } catch (error) {
            return response.json(notifications.error.receiving_data);
        }
    },
    async show(request, response){
        try{
            const id    = request.params.id;
            const department = await connection('departments')
                .select('name')
                .where('id', id)
                .first();
            if(!department){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            }else{
                return response.json(department);
            }
        } catch(error) {
            return response.json({
                error: notifications.error.receiving_data
            });
        }
    },
    async destroy(request, response){
        try{
            const id = request.params.id;
            const department = await connection('departments')
                .where('id', id)
                .del();
            
            console.log('[bknd server] Department: ' + notifications.success.delete_data);
            
            return response.json({
                message: notifications.success.delete_data,
                data: null
            });
        }catch(error){
            return response.json({
                error: notifications.error.deleting_data
            });
        }
    }
};