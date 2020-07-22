const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');

module.exports = {
    async create(request, response){
        try {
            const school_shift = request.body;

            //Checking if the data is already added
            const school_shift_already_added = await connection('school_shifts')
                .where('school_shift', school_shift)
                .select('id')
                .first();
            if(school_shift_already_added){
                return response.json({
                    message: notifications.alert.school_shift_already_added
                });
            }
            //insert data
            const school_shift_inserting = await connection('school_shifts')
                .insert(school_shift);

            //check if data was added
            if(!school_shift_inserting){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            } else {
                console.log('[bknd server] New School Shift: ' + notifications.success.insert_data);
                return response.json({
                    message: notifications.success.insert_data,
                    data: school_shift_inserting
                });
            }
        } catch (error) {
            return response.json(notifications.error.insert_data)
        }
    },
    async index(request, response){
        try {
            const school_shift = await connection('school_shifts')
                .select(['id','school_shift']);
            
            return response.json(school_shift);
        } catch (error) {
            return response.json(notifications.error.receiving_data);
        }
    },
    async show(request, response){
        try{
            const id    = request.params.id;
            const school_shift = await connection('school_shifts')
                .select('school_shift')
                .where('id', id)
                .first();
            if(!school_shift){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            }else{
                return response.json(school_shift);
            }
        } catch(error) {
            return response.json({
                error: notifications.error.receiving_data
            });
        }
    },
    async update(request, response){
        try{
            const id                = request.params.id;
            const {school_shift}    = request.body;

            //updating data
            const updating_school_shift = await connection('school_shifts')
                .where('id', id)
                .update({school_shift});
            
            //receiving the updated data
            const updated_data = await connection('school_shifts')
                .select('id','school_shift')
                .where('id', id)
                .first();
            
            console.log('[bknd server] School Shift: ' + notifications.success.update_data);

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

            const deleting_data = await connection('school_shifts')
                .where('id', id)
                .del();
            
            console.log('[bknd server] School Shift: ' + notifications.success.delete_data);
            
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