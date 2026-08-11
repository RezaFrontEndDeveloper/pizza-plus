import ReuseTitttle from "../components/ui/ReuseTitttle";
import MenuSection from "../features/menu/MenuSection";

export default function Menu() {
    return (
        <div className="flex mt-8 flex-col justify-center w-full items-center gap-4">
            <div>
                <ReuseTitttle>پیتزای مورد علاقه خودرا انتخاب کنید</ReuseTitttle>
            </div>
            <div>
                <MenuSection />
            </div>
        </div>
    );
}
