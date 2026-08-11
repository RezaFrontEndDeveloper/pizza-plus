import { VscLayoutMenubar } from "react-icons/vsc";
import ReuseTitttle from "../../components/ui/ReuseTitttle";
import { Link } from "react-router-dom";
import { HiArrowTurnDownLeft } from "react-icons/hi2";

export default function HeadOfOrderPage() {
    return (
        <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
                <span>
                    <VscLayoutMenubar size={30} />
                </span>
                <ReuseTitttle> سفارش جدید</ReuseTitttle>
            </div>

            <div>
                <Link
                    className="flex gap-2 justify-center items-center"
                    to="/cart">
                    <p>بازگشت</p>
                    <span>
                        <HiArrowTurnDownLeft />
                    </span>
                </Link>
            </div>
        </div>
    );
}
