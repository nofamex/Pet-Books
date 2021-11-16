import { User } from ".prisma/client";

export const registerResponse = (user:User) => {
    return {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        role: user.role,
        certificate: user.certificate,
        shelter_name: user.shelter_name,
        shelter_address: user.shelter_address,
        shelter_telephone: user.shelter_telephone,
        isVerified: user.isVerified
    }
}