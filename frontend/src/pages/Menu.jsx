import MenuSection from "../features/menu/MenuSection";

export default function Menu() {
    return (
        <div className="flex mt-8 flex-col justify-center w-full items-center gap-4">
            <h1 className="text-stone-700 text-2xl sm:text-3xl font-bold">
                پیتزای مورد علاقه خودرا انتخاب کنید
            </h1>
            <MenuSection />
        </div>
    );
}
