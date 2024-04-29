export const Header = () => {
    return (
        <nav id="header" className="bg-black text-white">
            <div className="w-full container mx-auto felx flex-wrap items-center justify.content-between mt-0 py-2">
                <div className="logo-wrapper pj-4 flex items-center">
                <img src="" alt="" />
                </div>

                <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
                    <div></div>
                    <div></div>
                </div>

                <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
                    <div>Cart</div>
                    <div>log in</div>
                </div>
            </div>
        </nav>
    )
}