const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');

module.exports = {
    async index(request, response){
        try {
            const jobs = await connection('jobs')
                .innerJoin('departments','departments.id','=','jobs.department_id')
                .select(['jobs.id','jobs.department_id','jobs.name as job_name','departments.name as department_name']);
            return response.json(jobs);
        } catch (error) {
            return response.json(notifications.error.receiving_data);
        }
    },
    async show(request, response){
        try{
            const id    = request.params.id;
            const job   = await connection('jobs')
                .innerJoin('departments','departments.id','=','jobs.department_id')
                .select(['jobs.id','jobs.department_id','jobs.name as job_name','departments.name as department_name'])
                .where('jobs.id', id)
                .first();
            if(!job){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            }else{
                return response.status(200).json(job);
            }
        } catch(error) {
            return response.json({
                error: notifications.error.receiving_data
            });
        }
    },
    async create(request, response){
        try {
            const {name,department_id} = request.body;

            //Checking if the job is already added
            const job_already_added = await connection('jobs')
                .where({
                    name: name,
                    department_id: department_id
                })
                .select('id')
                .first();
            if(job_already_added){
                return response.json({
                    message: notifications.alert.job_already_added
                });
            }
            //insert data
            const job_inserting = await connection('jobs')
                .insert({name,department_id});

            //check if data was added
            if(!job_inserting){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            } else {
                console.log('[bknd server] New Job: ' + notifications.success.insert_data);
                return response.json({
                    message: notifications.success.insert_data,
                    data: job_inserting
                });
            }
        } catch (error) {
            return response.json(notifications.error.insert_data);
        }
    },
    async update(request, response){
        try {
            const id = request.params.id;
            const {name, department_id} = request.body;

            //Checking if this data is already added
            const job_already_added = await connection('jobs')
                .where({
                    name: name,
                    department_id: department_id
                })
                .select('id')
                .first();
            if(job_already_added){
                return response.json({
                    message: notifications.alert.job_already_added
                });
            }
            //update data
            const job = await connection('jobs')
                .where('id', id)
                .update({
                    name: name,
                    department_id: department_id
                });
            
            //receiving the updated data
            const updated_data = await connection('jobs')
                .select('id','name','department_id')
                .where('id', id)
                .first();
            
            console.log('[bknd server] Job: ' + notifications.success.update_data);

            return response.json({
                message: notifications.success.update_data,
                data: updated_data
            })
            
        } catch (error) {
            return response.json(notifications.error.updating_data)
        }
    },
    async destroy(request, response){
        try {
            const id    = request.params.id;
            const job   = await connection('jobs')
                .where('id', id)
                .del();
            
            console.log('[bknd server] Job: ' + notifications.success.delete_data);
            
            return response.json({
                message: notifications.success.delete_data,
                data: null
            });
        } catch (error) {
            return response.json({
                error: notifications.error.deleting_data
            });
        }
    }
};