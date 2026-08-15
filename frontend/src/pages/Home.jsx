import HomeTitle from "../components/ui/HomeTitle";
import bg from "../assets/hero-image.png";
import mobileBg from "../assets/hero-image-mobile.png";
import RegisterForm from "../features/user/RegisterForm";
import useAuthStore from "../stores/authStore";

export default function Home() {
	const user = useAuthStore(state=>state.user)
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
					{ user ? null :<RegisterForm/>}
        </div>
    );
}
