import Navbar from "../Shared/Navbar";
import { Outlet, useNavigation } from "react-router-dom";

const MainLayout = () => {

    const navigation = useNavigation();

    const goToTop = () => window.scrollTo(0, 0)

    goToTop()

    return (
        <div>
            <Navbar />
            {
                navigation.state === "loading" ?
                    <div className="flex justify-center items-center h-[90vh]">
                        <span className="loading loading-spinner text-warning"></span>
                    </div>
                    :
                    <Outlet />
            }
        </div>
    );
};

export default MainLayout;