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
};