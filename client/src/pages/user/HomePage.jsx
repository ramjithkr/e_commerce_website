
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "../../redux/features/counterSlice";

export const HomePage = () => {
    const { value } = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    console.log("count===", value);

    return (
        <div className="px-20">
            <h2> HomePage </h2>

            <div className="flex gap-3 my-5">
                <button onClick={()=>dispatch(decrement())} className="btn btn-primary"> -</button>
                <p>{value} </p>
                <button onClick={()=>dispatch(increment())} className="btn btn-primary"> +</button>
                <button onClick={()=>dispatch(incrementByAmount(10))} className="btn btn-primary"> increment by 10</button>
            </div>
        </div>
    );
};