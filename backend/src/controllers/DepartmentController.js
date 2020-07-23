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
                    message: notifications.alert.department_already_added
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
    async update(request, response){
        try{
            const id        = request.params.id;
            const {name}    = request.body;

            //Checking if the department is already added
            const department_already_added = await connection('departments')
                .where('name', name)
                .select('id')
                .first();
            if(department_already_added){
                return response.json({
                    message: notifications.alert.department_already_added
                });
            }

            //updating data
            const department = await connection('departments')
                .where('id', id)
                .update({name});
            
            //receiving the updated data
            const updated_data = await connection('departments')
                .select('id','name')
                .where('id', id)
                .first();
            
            console.log('[bknd server] Department Data' + notifications.success.update_data);

            return response.json({
                message: notifications.success.update_data,
                data: updated_data
            })
        }catch(error){
            return response.json({
                error: notifications.error.updating_data
            });
        }
    },
    async destroy(request, response){
        try{
            const id = request.params.id;

            //Check if the department is been used
            const allowed_to_delete = await connection('jobs')
                .where({
                    department_id: id
                })
                .select('id');
            if (allowed_to_delete) {
                return response.json({
                    message: notifications.alert.department_used,
                    data: null
                });
            }
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