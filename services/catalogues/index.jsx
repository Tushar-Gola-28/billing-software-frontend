import { notify } from "@/components"
import { api } from "@/utils/AxiosInstances"

export const fetchAllCategories = async (signal, page, page_size, search) => {
    const response = await api.get("/service/catalogue_service/v1/category", { signal, params: { page, page_size, search } })
    return response.data || []
}
export const fetchAllMenus = async (signal, page, page_size, search) => {
    const response = await api.get("/service/catalogue_service/v1/menus", { signal, params: { page, page_size, search } })
    return response.data || []
}
export const addCategories = async (data) => {
    try {
        const response = await api.post("/service/catalogue_service/v1/category", data)
        return response.data || []
    } catch (err) {
        console.log(err.response.data);
        if (err.response.data.message) {
            notify(err.response.data.message)
        }

        throw new Error(err.response.data.message)
    }
}
export const updateCategories = async (data) => {
    try {
        const response = await api.put("/service/catalogue_service/v1/category", data)
        return response.data || []
    } catch (err) {
        console.log(err.response.data);
        if (err.response.data.message) {
            notify(err.response.data.message)
        }

        throw new Error(err.response.data.message)
    }
}