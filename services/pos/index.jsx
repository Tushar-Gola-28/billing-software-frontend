import { notify } from "@/components"
import { api } from "@/utils/AxiosInstances"

export const fetchAllActiveCategoriesAndMenus = async (signal, search) => {
    const response = await api.get("/service/catalogue_service/v1/category-and-menus", { signal, params: { search } })
    return response.data || []
}
export const fetchNextBillNo = async () => {
    const response = await api.post("/service/catalogue_service/v1/bill-no")
    return response.data?._payload || []
}
export const fetchGetAllOrders = async (signal, search, page, page_size) => {
    const response = await api.get("/service/catalogue_service/v1/orders", { signal, params: { search, page, page_size } })
    return response.data || []
}
export const fetchGetAllOrdersByOrderId = async (signal, order_id) => {
    const response = await api.get(`/service/catalogue_service/v1/orders/${order_id}`, { signal })
    return response.data || []
}
export const createOrder = async (data) => {

    try {
        const response = await api.post("/service/catalogue_service/v1/order-generate", data)
        return response.data || []
    } catch (err) {
        console.log(err.response.data);
        if (err.response.data.message) {
            notify(err.response.data.message)
        }

        throw new Error(err.response.data.message)
    }
}
export const updateOrder = async (data) => {

    try {
        const response = await api.put("/service/catalogue_service/v1/order-generate", data)
        return response.data || []
    } catch (err) {
        console.log(err.response.data);
        if (err.response.data.message) {
            notify(err.response.data.message)
        }

        throw new Error(err.response.data.message)
    }
}