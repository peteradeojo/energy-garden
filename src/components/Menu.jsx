const Menu = ({ markWatered, deletePlant }) => (
  <ul className="absolute z-[100] text-sm bottom-[20px] menu bg-white rounded-lg border border-gray-200 w-56">
    <li
      className="flex items-center gap-x-5 hover:cursor-pointer p-3 hover:bg-gray-100"
      onClick={markWatered}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.5501 18.0001L3.8501 12.3001L5.2751 10.8751L9.5501 15.1501L18.7251 5.9751L20.1501 7.4001L9.5501 18.0001Z"
          fill="#1D1B20"
        />
      </svg>
      Mark as watered
    </li>
    {/* <li className="flex items-center gap-x-5 hover:cursor-pointer p-3 hover:bg-gray-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Item 1
    </li> */}
    <li
      className="flex text-red-500 items-center gap-x-5 hover:cursor-pointer p-3 hover:bg-gray-100"
      onClick={deletePlant}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.8335 17.5C5.37516 17.5 4.9828 17.3368 4.65641 17.0104C4.33002 16.684 4.16683 16.2917 4.16683 15.8333V5H3.3335V3.33333H7.50016V2.5H12.5002V3.33333H16.6668V5H15.8335V15.8333C15.8335 16.2917 15.6703 16.684 15.3439 17.0104C15.0175 17.3368 14.6252 17.5 14.1668 17.5H5.8335ZM14.1668 5H5.8335V15.8333H14.1668V5ZM7.50016 14.1667H9.16683V6.66667H7.50016V14.1667ZM10.8335 14.1667H12.5002V6.66667H10.8335V14.1667Z"
          fill="#fb2c36"
        />
      </svg>
      Delete Plant
    </li>
  </ul>
);

export default Menu;
