import { useNavigate, useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { useEffect, useState } from "react";
import "./AllQuiz.css";
import { UserInfo } from "../../Components/header/header";

const AllQuiz = () => {
  const navigate = useNavigate();
  // state to handle storage quiz data
  const [localData, setLocalData] = useState();
  // state to handle user data
  const [userInformation, setUserInformation] = useState();
  // state to handle quiz component data
  const [quiz, setQuiz] = useState();
  const getData = async () => {
    fetch("http://localhost:3000/quiz/all-quizzes")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setQuiz(data);
      });
  };
// function to navegate to quiz
  const quizHandle = (id) => {
    navigate(`/quiz/${id}`);
  };

  useEffect(() => {
    !quiz && getData();
    // function to get local storage quiz data
    const localData = JSON.parse(localStorage.getItem("data"));
    //function to set usestate storage quiz data
    setLocalData(localData);
    // function to get local storage user data
    const userInformation = JSON.parse(localStorage.getItem("user"));
    //function to set usestate storage user data
    setUserInformation(userInformation);
  }, []);

  return (
    <>
      <UserInfo
        name={userInformation?.name}
        lastName={userInformation?.lastName}
      />
      <div className="all-quizzes-container">
        {quiz?.map((data) => {
          // function to find quiz localstorage data
          const userData = localData?.find(
            (localData) => parseInt(localData.id) === data.id
          );
          return (
            <div key={data.id} onClick={() => quizHandle(data.id)}>
              <Card
                img={data.img}
                title={data.name}
                text={data.description}
                correct={userData?.correct}
                resolved={userData?.resolved}
              />{" "}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllQuiz;
