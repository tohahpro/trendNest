import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <Helmet>
                <title>TrendNest</title>

            </Helmet>
            <div className='py-52'>
                <div className='flex justify-center items-center '>

                    <p className="text-5xl font-extrabold py-20 text-center">{`OPP'S 404 `}<br /> PAGE NOT FOUND</p>
                </div>
                <div className='flex justify-center items-center'>
                    <Link className='px-6 py-3 text-black font-macondo bg-green-400 rounded-lg text-lg font-medium' to='/'>Go Back Home </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;