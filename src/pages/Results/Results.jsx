import { useParams } from "react-router-dom";

const Result = () => {
    const { id } = useParams();
    return <div>
    {id}
  </div>
}

export default Result