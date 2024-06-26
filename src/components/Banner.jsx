import Button from "./elements/button"

export const Banner = () => {
    return (
        <div className="banner w-full md:w-2/3 px-7 mx-auto relative flex items-center-justift-between">
            <div className="banner-description w-full md:w-1/3 p-3">
                <h2 className="mb-6 text-4xl font-bold text-white">
                    Ordering
                </h2>
                <p className="font-semibold text-lg text-red-600 py-2">
                    Get Start!
                </p>
                <div className="btn-container">
                    <Button>Order</Button>
                    <a href="/menu" className="text-yellow-400 hover:text-yellow-500 font-bold text-decoration-line px-3">
                        See menu
                    </a>
                </div>
            </div>

            <div className="banner-image w-full md:w-1/3 p-3 flex justify-end">
                <img src={require("../assets/img/cafp.png")} alt="" className="max-h-95"/>
            </div>.png
        </div>
    )
}