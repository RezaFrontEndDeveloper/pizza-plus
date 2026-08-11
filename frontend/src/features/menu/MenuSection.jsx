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
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 rounded bg-stone-100 p-4 sm:grid-cols-2 md:grid-cols-3">
            {data.map((pizza) => (
                <MenuCart pizza={pizza} key={pizza.id} />
            ))}
        </div>
    );
}
