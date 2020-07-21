const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');

module.exports = {
    async create(request, response){
        try {
            const color = request.body;

            //Checking if the color is already added
            const color_already_added = await connection('colors')
                .where('color', color)
                .select('id')
                .first();
            if(color_already_added){
                return response.json({
                    message: notifications.alert.color_already_added
                });
            }
            //insert data
            const color_inserting = await connection('colors')
                .insert(color);

            //check if data was added
            if(!color_inserting){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            } else {
                console.log('[bknd server] New Color: ' + notifications.success.insert_data);
                return response.json({
                    message: notifications.success.insert_data,
                    data: color_inserting
                });
            }
        } catch (error) {
            return response.json(notifications.error.insert_data);
        }
    },
    async index(request, response){
        try {
            const colors = await connection('colors')
                .select(['id','color']);
            
            return response.json(colors);
        } catch (error) {
            return response.json(notifications.error.receiving_data);
        }
    },
    async show(request, response){
        try{
            const id    = request.params.id;
            const color = await connection('colors')
                .select('color')
                .where('id', id)
                .first();
            if(!color){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            }else{
                return response.json(color);
            }
        } catch(error) {
            return response.json({
                error: notifications.error.receiving_data
            });
        }
    },
};