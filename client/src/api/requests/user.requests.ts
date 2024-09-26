import { UpdateUserNameParams, updateUserPasswordParams, UserInformation, UserRaiting, UserSignInParams, UserSignUpParams } from "@/interfaces/apiInterfaces"
import userEndpointsConfig from "../endpoints/user/config"
import privateUser from "../user/private"
import publicUser from "../user/public"



const userApi = {
    userSignup: async ({ username, password, confirmPassword }: UserSignUpParams) => {
        try {
            const response = await publicUser.post(
                userEndpointsConfig.userSignUp,
                { username, password, confirmPassword }
            )

            return { response }
        } catch (error) {
            return { error }
        }
    },
    userSignIn: async ({ username, password }: UserSignInParams) => {
        try {
            const response = await publicUser.post(
                userEndpointsConfig.userSignIn,
                { username, password }
            )
            return { response }
        } catch (error) {
            return { error }
        }
    },
    getUserInformation: async (): Promise<{ response: UserInformation } | { error: any }> => {
        try {
            const response = await privateUser.get(
                userEndpointsConfig.getUserInformation
            )

            const userInfo: UserInformation = {
                playlists: response.playlists,
                username: response.username,
                songs: response.songs
            }
            return { response: userInfo }
        } catch (error) {
            return { error }
        }
    },
    getUserRating: async (): Promise<{ response: UserRaiting } | { error: any }> => {
        try {
            const response = await privateUser.get(
                userEndpointsConfig.getUserRating
            ) as unknown as UserRaiting

            return { response }
        } catch (error) {
            return { error }
        }
    },

    updateUserPassword: async ({ password, newPassword, confirmNewPassword }: updateUserPasswordParams) => {
        try {
            const response = await privateUser.put(
                userEndpointsConfig.updateUserPassword,
                { password, newPassword, confirmNewPassword }
            )

            return { response }
        } catch (error) {
            return { error }
        }
    },

    updateUserName: async ({ newUserName }: UpdateUserNameParams) => {
        try {
            const response = await privateUser.put(
                userEndpointsConfig.updateUserName,
                { newUserName }
            )

            return { response }
        } catch (error) {
            return { error }
        }
    }
}

export default userApi