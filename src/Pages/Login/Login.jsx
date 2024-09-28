import React, { useState } from "react";
import { Input, Logo, Password, SubmitButton } from "../../Components/index";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, selectAuthLoader } from "../../store/slice/authSlice";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const [error, setError] = useState("");
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const loading = useSelector(selectAuthLoader);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    dispatch(loginAction({ formdata: data, navigate }))
      .unwrap()
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="border-[1px] w-full sm:w-2/3 mx-3 lg:w-2/3 w-max-[1266px] min-h-[80%] rounded-xl flex flex-col items-center justify-center pb-4 shadow-xl bg-white">
          <Logo className="mt-5" />
          <h2 className="text-2xl my-4">Login to account</h2>
          <p className="mb-3">
            Don't have any account?{" "}
            <Link to={"/signup"} className="text-blue-500">
              Signup
            </Link>
          </p>
          <p id="error-message" className="text-red-600">
            {error}
          </p>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full px-3 sm:w-2/3 lg:w-2/4 h-full"
          >
            <Input
              type="email"
              name="email"
              register={register}
              placeholder="Email"
              errors={errors}
            />
            <Password
              register={register}
              placeholder="Password"
              errors={errors}
            />
            <SubmitButton value="Login" isSubmitPending={loading} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
