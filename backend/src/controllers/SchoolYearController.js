const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');
const { index } = require('./AdminController');

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
};