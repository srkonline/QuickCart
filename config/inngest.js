import { Inngest } from "inngest";
import connectDB from "./db";
import { User } from "@clerk/nextjs/dist/types/server";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//inngest fun to save user data to a db
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {event:'clerk/user.created'},
    async ({event}) => {
        const { id, first_name , last_name, email_addresses, imge_url } = event.data
        const userData={
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userData)
    }
)


export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {
        event:'clerk/user.updated'
    },
    async ({ event }) =>{
        const { id, first_name , last_name, email_addresses, imge_url } = event.data
        const userData={
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)
    }
)

// inngest function to delete user from database
export const syncUserDeletion = inngest.createFunction(
    {
        id:'delete-user-with-clerk'
    },
    {
        event: 'clerk/userr.deleted'
    },
    async ({event})=>{
        const {id}= event.data

        await connectDB()
        await User.findByIdAndDelete(id)
    }

)