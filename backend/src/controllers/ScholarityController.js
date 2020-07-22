const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');

module.exports = {
    async create(request, response){
        try {
            const scholarity = request.body;

            //Checking if the scholarity is already added
            const scholarity_already_added = await connection('scholarities')
                .where('scholarity', scholarity)
                .select('id')
                .first();
            if(scholarity_already_added){
                return response.json({
                    message: notifications.alert.scholarity_already_added
                });
            }
            //insert data
            const scholarity_inserting = await connection('scholarities')
                .insert(scholarity);

            //check if data was added
            if(!scholarity_inserting){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            } else {
                console.log('[bknd server] New Scholarity: ' + notifications.success.insert_data);
                return response.json({
                    message: notifications.success.insert_data,
                    data: scholarity_inserting
                });
            }
        } catch (error) {
            return response.json(notifications.error.insert_data);
        }
    },
};