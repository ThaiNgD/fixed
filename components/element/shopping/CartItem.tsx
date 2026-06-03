const CartItem = () => {
  return (
    <>
      <div className="flex p-4 bg-[#f8f5f0] w-full border-y border-gray-200 font-sans">
        <img
          src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=200"
          alt="Minimalist Ceramic Vase"
          className="w-[100px] h-[100px] rounded-md object-cover shadow-sm"
        />

        <div className="flex flex-col justify-between flex-1 ml-4">
          <div className="flex justify-between items-start">
            <h3 className="text-[15px] font-medium text-[#2a3855] leading-tight">
              Minimalist Ceramic Vase
            </h3>
            <button
              className="text-[#2a3855] hover:text-gray-800 ml-2"
              aria-label="Remove item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="text-[13px] text-gray-500 mt-1">
            <p>Color: Maroon</p>
            <p>Size : 86 Cm</p>
          </div>

          <div className="flex justify-between items-center mt-3">
            <p className="text-base font-bold text-black tracking-tight">$64</p>

            <div className="flex items-center space-x-3">
              <button className="w-10 h-7 flex items-center justify-center border border-gray-500 rounded-[20px] text-gray-800 hover:bg-gray-100 transition-colors">
                <span className="text-sm leading-none pb-[2px]">-</span>
              </button>
              <span className="text-[15px] font-medium text-gray-800 w-3 text-center">
                2
              </span>
              <button className="w-10 h-7 flex items-center justify-center border border-gray-500 rounded-[20px] text-gray-800 hover:bg-gray-100 transition-colors">
                <span className="text-sm leading-none pb-[2px]">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
