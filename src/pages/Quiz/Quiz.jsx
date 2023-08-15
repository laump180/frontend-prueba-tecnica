import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RadioButton from "../../Components/radioButton/RadioButton";
import { useForm } from "react-hook-form";
import "./Quiz.css";
import Button from "../../Components/button/Button";
import { UserInfo } from "../../Components/header/header";

const Quiz = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const [localData, setLocalData] = useState();
  const [userInformation, setUserInformation] = useState();
  const [quiz, setQuiz] = useState();

  const getData = async () => {
    fetch(`http://localhost:3000/quiz/quiz-questions/${id}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setQuiz(data);
      });
  };

  const saveLocalStorage = (saveData) => {
    const dataStorage = JSON.parse(localStorage.getItem("data"));

    const findData = dataStorage?.find((data) => data.id === saveData.id);
    if (!findData) {
      const newSaveData = [...dataStorage, saveData];
      localStorage.setItem("data", JSON.stringify(newSaveData));
      navigate("/allquiz");
    }
  };

  const sendData = (data) => {
    fetch("http://localhost:3000/quiz/quiz-result", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        const saveData = {
          id: id,
          resolved: true,
          correct: value,
          answers: data.questions,
          correctAnswers: [],
        };

        saveLocalStorage(saveData);
      });
  };

  useEffect(() => {
    !quiz && getData();
    const userInformation = JSON.parse(localStorage.getItem("user"));
    setUserInformation(userInformation);
  }, []);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data"));

    const userData = localData?.find((localData) => localData.id === id);
    setLocalData(userData);
    console.log(userData);
  }, [quiz]);

  const onSubmit = (data) => {
   // if local i have localstorage for this quizz send me back to all quizzes
    if(!localData){
      const newData = {
        id: id,
        questions: data,
      };
  
      sendData(newData);
    }else{
      navigate(`/allquiz`);
    }

  };

  return (
    <div className="quiz-container">
      <UserInfo
        name={userInformation?.name}
        lastName={userInformation?.lastName}
      />
      <h1 className="quiz-title">{quiz?.quizz?.name}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="home-form">
    
        <div className="quiz-question-container">
              {/* maping all question for the backend data */}
          {quiz?.quizz?.questions.map((value) => {
            return (
              <div key={value.id} className="quiz-question-wrap">
                <div className="quiz-question-title">{value?.question}</div>
                <div className="quiz-question-answers">
                   {/* maping all the answer questions for the backend data */}
                  {value?.answers?.map((answersValue) => {
                    // validate if the userquiz localstorage data have a answer
                     const correct = parseInt(localData?.answers[value.id]) === answersValue.id
                    return (
                      <RadioButton
                        key={answersValue.id}
                        name={`question-${value.id}`}
                        value={answersValue.id}
                        register={register(`${value.id}`)}
                        label={answersValue?.answer}
                        checked={ correct || null}
                        solved={correct && answersValue?.correct}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {localData ? (
          <Button
            text={"Regresar"}
          />
        ) : (
          <Button text={"Continuar"} />
        )}
      </form>
    </div>
  );
};

export default Quiz;
