import { useEffect, useState } from "react";
import "./Home.css";
import Input from "../../Components/input/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/button/Button";

function Home() {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("data", JSON.stringify([]));
    navigate('/allquiz')
  };

  useEffect(()=>{
    let user = localStorage.getItem("user");
    if(user)navigate('/allquiz')
  },[])
  return (
    <>
      <div className="home-container">
        <h1 className="home-title">Quiz Time!</h1>
        <div className="home-square "></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="home-form">
        {/* register your input into the hook by invoking the "register" function */}
        <Input
          label={"Nombre"}
          placeholder={"Ingresa tu nombre"}
          register={register("name", { required: true })}
          error={errors.name}
        />
        <Input
          label={"Apellido"}
          placeholder={"Ingresa tu Apellido"}
          register={register("lastName", { required: true })}
          error={errors.lastName}
        />
        <Input
          label={"Correo"}
          placeholder={"Ingresa tu Correo"}
          register={register("email", { required: true })}
          error={errors.email}
        />

        <Button text={"Continuar"} />
      </form>
    </>
  );
}

export default Home;
