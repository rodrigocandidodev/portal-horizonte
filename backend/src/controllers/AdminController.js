const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');
const bcrypt        = require('bcryptjs');

module.exports = {
    async index(request, response){
        try{
            const admins = await connection('admins')
                .select([
                    'id',
                    'name',
                    'username',
                    'email'
                ]);

            return response.json(admins);
        } catch(error){
            return response.json({
                error: notifications.error.receiving_data
            });
        }   
    },
    async create(request, response){
        try{
            const password  = request.body.password;
            const {name, username, email} = request.body;

            //checking if any field is empty
            if(!name || !username || !email || !password) {
                return response.json({message: notifications.alert.empty_fields});
            } 

            //checking if email is valid
            if(email.indexOf('@') == -1 || email.indexOf('.')==-1 ){
                return response.json({message: notifications.alert.invalid_email});
            }

            //Checking if the email is already used
            const email_used = await connection('admins')
                .where('email', email)
                .select('id')
                .first();

            if(email_used){
                return response.json({
                    message: notifications.alert.email_already_used
                });
            }

            //Checking if the username is already used
            const username_used = await connection('admins')
            .where('username', username)
            .select('id')
            .first();

            if(username_used){
                return response.json({
                    message: notifications.alert.username_already_used
                });
            }

            //encrypting given password
            const hashedPassword = await bcrypt.hash(password,10);

            //gathering data
            const data = {
                name: name,
                username: username,
                email: email,
                password: hashedPassword
            };

            //inserting data into database
            const admin = await connection('admins').insert(data);
            //if data was not inserted
            if(!admin){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            }else{
                console.log('[bknd server] New Admin' + notifications.success.insert_data);
                return response.json({
                    message: notifications.success.insert_data,
                    data: admin
                });
            }
        }catch(error){
            return response.json({
                error: notifications.error.insert_data
            });
        }
    },
    async show(request, response){
        try{
            const id    = request.params.id;
            const admin = await connection('admins')
                .select('id', 'name', 'username', 'email')
                .where('id', id)
                .first();
            if(!admin){
                return response.status(400).json({
                    message: notifications.alert.no_data_found,
                    data: null
                });
            }else{
                return response.json(admin);
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
            const {name, username, email}    = request.body;

            //checking if any field is empty
            if(!name || !username || !email) {
                return response.json({message: notifications.alert.empty_fields});
            } 

            //checking if email is valid
            if(email.indexOf('@') == -1 || email.indexOf('.')==-1 ){
                return response.json({message: notifications.alert.invalid_email});
            }

            //Checking if the email is already used
            const email_used = await connection('admins')
                .whereNot('id', '=', id)
                .andWhere('email', email)
                .select('id')
                .first();

            if(email_used){
                return response.json({
                    message: notifications.alert.email_already_used
                });
            }

            //Checking if the username is already used
            const username_used = await connection('admins')
                .whereNot('id','=',id)
                .andWhere('username','=', username)
                .select('id')
                .first();

            if(username_used){
                return response.json({
                    message: notifications.alert.username_already_used
                });
            }

            //updating data
            const admin = await connection('admins')
                .where('id', id)
                .update({name, username, email});
            
            //receiving the updated data
            const updated_data = await connection('admins')
                .select('name', 'username', 'email')
                .where('id', id)
                .first();
            
            console.log('[bknd server] Admin Data' + notifications.success.update_data);

            return response.json({
                message: notifications.success.update_data,
                data: updated_data
            })
        }catch(error){
            console.error(error);
            return response.json({
                error: notifications.error.updating_data
            });
        }
    },
    async destroy(request, response){
        try{
            const id = request.params.id;
            const admin = await connection('admins')
                .where('id', id)
                .del();
            
            console.log('[bknd server] Admin Data' + notifications.success.delete_data);
            
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
}