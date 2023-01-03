const Skeleton = ({ type }) => {
  if (type === "productCard") {
    return (
      <div className="bg-base-300 rounded-2xl overflow-hidden">
        <div className="animate-pulse flex flex-col  ">
          <div className="w-full h-[200px] bg-slate-700"></div>
          <div className="flex flex-col p-2">
            <div className="w-full h-3 bg-slate-700 rounded-full"></div>
            <div className="flex items-center justify-between mt-3">
              <div className="w-10 h-10 bg-slate-700 rounded-xl"></div>
              <div className="w-20 h-10 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === "table") {
    return (
      <tr className="animate-pulse ">
        <td>
          <div className="w-5 h-7 bg-slate-700"></div>
        </td>
        <td>
          <div className="w-9 h-9 bg-slate-700 rounded-xl"></div>
        </td>
        <td>
          <div className="w-full h-5 bg-slate-700"></div>
        </td>
        <td className="flex justify-center">
          <div className="w-10 h-5 bg-slate-700"></div>
        </td>
        <td>
          <div className="flex items-center justify-center gap-2">
            <div className="w-14 h-10 bg-slate-700 rounded-lg"></div>
            <div className="w-14 h-10 bg-slate-700 rounded-lg"></div>
          </div>
        </td>
      </tr>
    );
  }
};

export default Skeleton;
