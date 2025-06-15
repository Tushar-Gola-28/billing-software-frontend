import { api } from "@/utils/AxiosInstances"

export const fetchAllActiveCategoriesAndMenus = async (signal, search) => {
    const response = await api.get("/service/catalogue_service/v1/category-and-menus", { signal, params: { search } })
    return response.data || []
}