import { PropagateLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <PropagateLoader color="#ff8080" />
        </div>
    );
}
