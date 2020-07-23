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
    async index(request, response){
        try {
            const grades = await connection('grades')
                .innerJoin('scholarities', 'grades.scholarity_id', '=', 'scholarities.id')
                .select(['grades.id','grades.grade', 'grades.beginning_age', 'grades.scholarity_id', 'scholarities.scholarity']);
            
            return response.json(grades);
        } catch (error) {
            return response.json(notifications.error.receiving_data);
        }
    },
    async show(request, response){
        try{
            const id    = request.params.id;
            const grade = await connection('grades')
                .innerJoin('scholarities', 'grades.scholarity_id', '=', 'scholarities.id')
                .select(['grades.id','grades.grade', 'grades.beginning_age', 'grades.scholarity_id', 'scholarities.scholarity'])
                .where('grades.id', id)
                .first();
            if(!grade){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            }else{
                return response.json(grade);
            }
        } catch(error) {
            return response.json({
                error: notifications.error.receiving_data
            });
        }
    },
    async update(request, response){
        try{
            const id = request.params.id;
            const {grade, beginning_age, scholarity_id}  = request.body;

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

            //updating data
            const updating_scholarity = await connection('grades')
                .where('id', id)
                .update({
                    'grade': grade,
                    'beginning_age': beginning_age, 
                    'scholarity_id': scholarity_id
                });
            
            //receiving the updated data
            const updated_data = await connection('grades')
                .innerJoin('scholarities', 'grades.scholarity_id', '=', 'scholarities.id')
                .select(['grades.id','grades.grade', 'grades.beginning_age', 'grades.scholarity_id', 'scholarities.scholarity'])
                .where('grades.id', id)
                .first();        
            
            console.log('[bknd server] Grade: ' + notifications.success.update_data);

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

            const deleting_data = await connection('grades')
                .where('id', id)
                .del();
            
            console.log('[bknd server] Grade: ' + notifications.success.delete_data);
            
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