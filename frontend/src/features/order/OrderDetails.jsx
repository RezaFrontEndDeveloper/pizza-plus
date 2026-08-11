import HeadOfOrderDetails from "./HeadOfOrderDetails";
import OrderDetailTable from "./OrderDetailTable";

export default function OrderDetails({ data }) {
    return (
        <div>
            <HeadOfOrderDetails />

            <OrderDetailTable data={data} />
        </div>
    );
}
