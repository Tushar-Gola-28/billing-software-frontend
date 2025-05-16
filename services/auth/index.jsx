import { notify } from "@/components"
import { api } from "@/utils/AxiosInstances"

export const fetchAllPlans = async (signal) => {
    const response = await api.get("/service/customer_service/v1/no-auth/plans", { signal })
    return response.data?._payload || []
}
export const registerVendor = async (data) => {
    try {
        const response = await api.post("/service/customer_service/v1/no-auth/vendor", data)
        return response.data?._payload || []
    } catch (err) {
        console.log(err.response.data.message);
        if (err.response.data.message) {
            notify(err.response.data.message)
        }
        return err
    }
}
export const loginVendor = async (data) => {
    try {
        const response = await api.post("/service/customer_service/v1/no-auth/login", data)
        return response.data?._payload || []
    } catch (err) {
        console.log(err.response.data.message);
        if (err.response.data.message) {
            notify(err.response.data.message)
        }

        return err
    }
}
export const logoutVendor = async () => {
    try {
        const response = await api.post("/service/customer_service/v1/logout")
        return response.data || []
    } catch (err) {
        console.log(err.response.data.message);
        if (err.response.data.message) {
            notify(err.response.data.message)
        }

        return err
    }
}