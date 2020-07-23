const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');

module.exports = {
    async create(request, response){
        try {
            const {grade, beginning_age, scholarity_id} = request.body;

            //Checking if the grade is already added
            const grade_already_added = await connection('grades')
                .where('grade', grade)
                .select('id')
                .first();
            if(grade_already_added){
                return response.json({
                    message: notifications.alert.grade_already_added
                });
            }
            //insert data
            const grade_inserting = await connection('grades')
                .insert({
                    'grade': grade,
                    'beginning_age': beginning_age,
                    'scholarity_id': scholarity_id
                });

            //check if data was added
            if(!grade_inserting){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            } else {
                console.log('[bknd server] New Grade: ' + notifications.success.insert_data);
                return response.json({
                    message: notifications.success.insert_data,
                    data: grade_inserting
                });
            }
        } catch (error) {
            return response.json(notifications.error.insert_data);
        }
    },
};