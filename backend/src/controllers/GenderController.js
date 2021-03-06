const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');

module.exports = {
    async create(request, response){
        try {
            const gender = request.body;

            //Checking if the gender is already added
            const gender_already_added = await connection('genders')
                .where('gender', gender)
                .select('id')
                .first();
            if(gender_already_added){
                return response.json({
                    message: notifications.alert.gender_already_added
                });
            }
            //insert data
            const gender_inserting = await connection('genders')
                .insert(gender);

            //check if data was added
            if(!gender_inserting){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            } else {
                console.log('[bknd server] New Gender: ' + notifications.success.insert_data);
                return response.json({
                    message: notifications.success.insert_data,
                    data: gender_inserting
                });
            }
        } catch (error) {
            return response.json(notifications.error.insert_data)
        }
    },
    async index(request, response){
        try {
            const genders = await connection('genders')
                .select(['id','gender']);
            
            return response.json(genders);
        } catch (error) {
            return response.json(notifications.error.receiving_data);
        }
    },
    async show(request, response){
        try{
            const id    = request.params.id;
            const gender = await connection('genders')
                .select('gender')
                .where('id', id)
                .first();
            if(!gender){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            }else{
                return response.json(gender);
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
            const {gender}  = request.body;

            //Checking if the gender is already added
            const gender_already_added = await connection('genders')
                .whereNot('id','=', id)
                .andWhere('gender', gender)
                .select('id')
                .first();
            if(gender_already_added){
                return response.json({
                    message: notifications.alert.gender_already_added
                });
            }

            //updating data
            const updating_gender = await connection('genders')
                .where('id', id)
                .update({gender});
            
            //receiving the updated data
            const updated_data = await connection('genders')
                .select('id','gender')
                .where('id', id)
                .first();
            
            console.log('[bknd server] Gender: ' + notifications.success.update_data);

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

            const deleting_data = await connection('genders')
                .where('id', id)
                .del();
            
            console.log('[bknd server] Gender: ' + notifications.success.delete_data);
            
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