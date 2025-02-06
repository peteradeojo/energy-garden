const FormInput = ({
  children,
  inputRef,
  extraInputClass,
  extraContainerClass,
  ...inputProps
}) => {
  return (
    <div
      className={`overflow-clip relative flex items-center gap-1 ${extraContainerClass}`}
    >
      {children}
      <input
        ref={inputRef}
        {...inputProps}
        className={`border rounded-md py-4 px-5 bg-[#FAFAFA] w-full outline-0 placeholder:text-[#B0B0B0] placeholder:font-light focus:bg-transparent focus:border-green-500 duration-300 ${extraInputClass}`}
      />
    </div>
  );
};

export default FormInput;
