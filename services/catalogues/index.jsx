import { api } from "@/utils/AxiosInstances"

export const fetchAllCategories = async (signal, page, page_size, search) => {
    const response = await api.get("/service/catalogue_service/v1/category", { signal, params: { page, page_size, search } })
    return response.data || []
}