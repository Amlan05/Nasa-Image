import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.password}@cluster0.fssnwwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log(err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}