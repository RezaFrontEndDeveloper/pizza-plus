import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrder } from "../services/order";

import OrderHeader from "../features/order/OrderHeader";
import OrderInformations from "../features/order/orderInformations";
import CustomerInformation from "../features/order/CustomerInformation";
import Loading from "../components/ui/Loading";
import OrderDetails from "../features/order/OrderDetails";

export default function Order() {
    const { id } = useParams();

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["order", id],
        queryFn: () => getOrder(id),
    });

    console.log(data);

    if (isLoading) return <Loading />;
    return (
        <div className="w-full px-10 ">
            <OrderHeader />
            <div className="w-full p-10 flex justify-around items-center">
                <OrderInformations data={data} />
                <CustomerInformation data={data} />
            </div>
            <OrderDetails data={data} />
        </div>
    );
}
