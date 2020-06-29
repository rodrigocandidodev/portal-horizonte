const connection    = require('../database/connection');
const notifications = require('../utils/notification_messages');
const bcrypt        = require('bcryptjs');

module.exports = {
    async index(request, response){
        try{
            const admins = await connection('admins')
                .select([
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
                    data: admin
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
    }
}