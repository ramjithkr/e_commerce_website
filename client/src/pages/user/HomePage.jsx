import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/features/counterSlice";
export const HomePage = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">HomePage</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          -
        </button>
        <p className="text-2xl font-semibold text-gray-800">{count}</p>
        <button
          onClick={() => dispatch(increment())}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          +
        </button>

      </div>
    </div>
  );
};
