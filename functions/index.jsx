export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function getTotalMenuGST(menuList) {
    let totalSGST = 0;
    let totalCGST = 0;
    let totalDiscount = 0;
    let totalPrice = 0;

    menuList.forEach(menu => {
        if (!menu.status) return;

        const qty = menu.qty || 1;
        const gstPercentage = menu.gst_percentage || 0;
        const discount = menu.discount || 0;
        const gstInclusivePrice = menu.total_price_with_gst || menu.price;

        const totalMenuPrice = gstInclusivePrice * qty;
        const discountTotal = discount * qty;

        // Base price (without GST)
        const basePrice = (totalMenuPrice * 100) / (100 + gstPercentage);
        const totalGST = totalMenuPrice - basePrice;

        const cgst = totalGST / 2;
        const sgst = totalGST / 2;

        totalSGST += sgst;
        totalCGST += cgst;
        totalDiscount += discountTotal;
        totalPrice += totalMenuPrice;

        // If you later want to add addon GST, compute similarly from `addon.total_price_with_gst`
    });

    return {
        totalSGST: parseFloat(totalSGST.toFixed(2)),
        totalCGST: parseFloat(totalCGST.toFixed(2)),
        totalGST: parseFloat((totalSGST + totalCGST).toFixed(2)),
        totalDiscount: parseFloat(totalDiscount.toFixed(2)),
        totalPrice: parseFloat(totalPrice.toFixed(2)),
    };
}
