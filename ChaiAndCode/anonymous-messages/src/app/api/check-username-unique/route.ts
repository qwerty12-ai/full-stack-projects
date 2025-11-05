import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import z from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

// query schema --> we use this whenever object or variable needs to be checked for its syntax.
const UserNameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {

    // By investigation study -->  not needed in newer versions as it handled in newer versions by itself
    // if (request.method !== "GET") {
    //     return Response.json({
    //         success: false,
    //         message: 'Method not allowed'
    //     }, { status: 405 })
    // } 

    await dbConnect()

    try {
        // reading the query parameters easily  --> searchParams and creating an URL object of the string full path
        // locally: localhost:3000/api/check-username-unique?username=sabs?phone=android for example we took usrrname query
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        // validate with zod and safeParse checks if the value of username abids by the username schema.
        const result = UserNameQuerySchema.safeParse(queryParam)
        console.log(result)
        if (!result.success) {
            const userNameErrors = result.error.format().username?._errors || []
            return Response.json(
                {
                    success: false,
                    message: userNameErrors?.length > 0 ? userNameErrors.join(', ') : 'Invalid query parameters',
                },
                {
                    status: 400
                }
            )
        }

        const { username } = result.data

        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: 'Username is already taken'
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            message: 'Username is available'
        }, { status: 200 })


    } catch (error) {
        console.error("Error checking username", error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            { status: 500 })
    }
}