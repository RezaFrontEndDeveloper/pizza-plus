import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { IoMdReturnLeft } from "react-icons/io";

export default function EmpyCart() {
    return (
        <div className="h-screen p-4 bg-white flex flex-col gap-8 justify-center items-center border border-stone-200">
            <h1 className="text-2xl md:text-5xl text-stone-700 flex justify-center items-center gap-4 font-bold">
                <span>
                    <SlBasket />
                </span>
                سبد خرید شما خالیه !!!
            </h1>
            <Link to="/menu">
                <Button variant={"primary"}>
                    بزن بریم خرید کنیم
                    <span>
                        <IoMdReturnLeft />
                    </span>
                </Button>
            </Link>
        </div>
    );
}
