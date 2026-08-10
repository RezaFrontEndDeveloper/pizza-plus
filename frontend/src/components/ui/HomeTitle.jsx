export default function HomeTitle() {
    return (
        <div
            className="
                flex
                flex-col
                items-start
                gap-4
                w-full
                px-6
                text-center

                sm:items-start
                md:text-center
                md:w-auto
                md:px-0
                sm:mx-50
               
            ">
            <p className="text-3xl md:text-7xl font-bold">سریع.</p>

            <p className="text-3xl md:text-6xl font-bold text-red-500">
                خوشمزه
            </p>

            <p className="text-3xl md:text-6xl font-bold text-red-500">آسان</p>

            <p className=" text-stone-700 text-base md:text-lg">
                بهترین پیتزاها، داغ و تازه
                <br />
                در سریع‌ترین زمان درب منزل شما
            </p>
        </div>
    );
}
