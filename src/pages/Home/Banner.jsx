// import { Fade } from "react-awesome-reveal";

import banner1 from "../../assets/images/banner1.jpg"
import banner2 from "../../assets/images/banner2.jpg"
import banner3 from "../../assets/images/banner3.jpg"




const Banner = () => {

    return (

        <div className=" rounded-xl">
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <img
                        src={banner1}
                        className="w-full lg:h-[600px] rounded-lg" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img
                        src={banner2}
                        className="w-full lg:h-[600px] rounded-lg" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img
                        src={banner3}
                        className="w-full lg:h-[600px] rounded-lg" />
                </div>
               
            </div>
            <div className="flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
            </div>
        </div>

    );
};

export default Banner;