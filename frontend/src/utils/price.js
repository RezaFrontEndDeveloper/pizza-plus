export const toPersianDigits = (value) =>
    String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);

export const totalPrice = (array) => {
    return array.reduce((acc, pizza) => {
        return acc + pizza.price;
    }, 0);
};
