import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../../services/menuApi";
import MenuCart from "./MenuCart";
import Loading from "../../components/ui/Loading";

export default function MenuSection() {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["menu"],
        queryFn: getMenu,
    });

    if (isPending) return <Loading />;
    if (isError) return <p>{error.message}</p>;

    return (
        <div className="grid w-full mx-4 grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 bg-stone-100 p-4">
            {data.map((pizza) => (
                <MenuCart pizza={pizza} key={pizza.id} />
            ))}
        </div>
    );
}
