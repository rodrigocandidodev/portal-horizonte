const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');

module.exports = {
    async create(request, response){
        try{
            const year = request.body;

            //Checking if the year is already added
            const year_already_added = await connection('school_years')
                .where('year', year)
                .select('id')
                .first();
            if(year_already_added){
                return response.json({
                    message: notifications.alert.school_year_already_added
                });
            }
            //insert data
            const school_year = await connection('school_years')
                .insert(year);

            //check if data was added
            if(!school_year){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            } else {
                console.log('[bknd server] New School Year: ' + notifications.success.insert_data);
                return response.json({
                    message: notifications.success.insert_data,
                    data: school_year
                });
            }
        } catch (error) {
            return response.json(notifications.error.insert_data);
        }
    },
    async index(request, response){
        try {
            const school_years = await connection('school_years')
                .select(['id','year']);
            
            return response.json(school_years);
        } catch (error) {
            return response.json(notifications.error.receiving_data);
        }
    },
    async show(request, response){
        try{
            const id    = request.params.id;
            const school_year = await connection('school_years')
                .select('year')
                .where('id', id)
                .first();
            if(!school_year){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            }else{
                return response.json(school_year);
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
            const {year}    = request.body;

            //Checking if the data is already added
            const year_already_added = await connection('school_years')
                .whereNot('id', '=', id)
                .andWhere('year', year)
                .select('id')
                .first();
            if(year_already_added){
                return response.json({
                    message: notifications.alert.school_year_already_added
                });
            }

            //updating data
            const updating_school_year = await connection('school_years')
                .where('id', id)
                .update({year});
            
            //receiving the updated data
            const updated_data = await connection('school_years')
                .select('id','year')
                .where('id', id)
                .first();
            
            console.log('[bknd server] School Year: ' + notifications.success.update_data);

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
            const school_years = await connection('school_years')
                .where('id', id)
                .del();
            
            console.log('[bknd server] School Year: ' + notifications.success.delete_data);
            
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