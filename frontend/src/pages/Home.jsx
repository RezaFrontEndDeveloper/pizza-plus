import CreateUserName from "../features/user/CreateUserName";
import HomeTitle from "../components/ui/HomeTitle";
import bg from "../assets/hero-image.png";
import mobileBg from "../assets/hero-image-mobile.png";

export default function Home() {
    return (
        <div
            style={{
                "--bg-image": `url(${bg})`,
                "--mobile-bg-image": `url(${mobileBg})`,
            }}
            className="
            gap-8
            p-4
                flex
                flex-col
                justify-start
                items-center
                w-full
                h-full
               bg-(image:--mobile-bg-image)
                bg-cover
                bg-center

                md:flex-row
                md:justify-between
               md:bg-(image:--bg-image)
            ">
            <HomeTitle />
            <CreateUserName />
        </div>
    );
}
