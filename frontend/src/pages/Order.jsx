import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getOrder } from '../services/order';

import OrderHeader from '../features/order/OrderHeader';
import OrderInformations from '../features/order/orderInformations';
import CustomerInformation from '../features/order/CustomerInformation';
import Loading from '../components/ui/Loading';
import OrderDetails from '../features/order/OrderDetails';
import TotalPriceSection from '../features/order/TotalPriceSection';

export default function Order() {
  const { id } = useParams();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(id),
  });

  console.log(data);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl md:text-5xl text-stone-700">{error.message}</h1>
      </div>
    );
  return (
    <div className="w-full px-10 ">
      <OrderHeader />
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="w-full md:w-1/2">
          <OrderInformations data={data} />
        </div>

        <div className="w-full md:w-1/2">
          <CustomerInformation data={data} />
        </div>
      </div>
      <OrderDetails data={data} />
      <TotalPriceSection data={data} />
    </div>
  );
}
