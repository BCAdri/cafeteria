import aboutImage from "../assets/img/cafp.png";

export const About = () => {

    return (
        <div className="bg-white">
            <div className="p-24 grid grid-cols-2">
                <div className="">
                    <h2 className="text-2xl font-medium">About Us</h2>
                    <p className="text-lg">
                    SimCafs offers a web platform designed specifically for the comprehensive management of coffee shops.
                      With an understanding of the unique demands and complexities of this industry, our team has been dedicated to developing a solution that not only
                      address immediate operational needs, but also anticipate and adapt to emerging trends in the industry.
                    </p>
                </div> 
                <div className="flex items-center justify-center">
                    <img src={aboutImage} alt="" className="w-[400px] h-[400px] object-cover" />
                </div>
            </div>
        </div>
    )
}