import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/elements/button";
import { app } from "../../firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { clearCart  } from "../../stores/cart/cartSlice";

  const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    const authentication = getAuth();
    let uid = "";
    createUserWithEmailAndPassword(authentication, data.email, data.password)
        .then((response) => {
            dispatch(clearCart());
            uid = response.user.uid;
            sessionStorage.setItem("UserId", uid);
            sessionStorage.setItem(
                "Auth token",
                response._tokenResponse.refreshToken
            );
            window.dispatchEvent(new Event("storage"));

            fetch("http://108.143.70.6:8000/api/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    sessionId: uid,
                    role: 'worker'  // Rol por defecto
                }),
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return response.json().then(err => Promise.reject(err));
                    }
                })
                .then((userData) => {
                    sessionStorage.setItem("UserRole", userData.data.role);
                    setLoading(false);
                    toast.success("Account created successfully!🎉", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setTimeout(() => {
                        navigate("/home");
                    }, 2000);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    toast.error("Error creating account");
                });
        })
        .catch((error) => {
            setLoading(false);
            if (error.code === "auth/email-already-in-use") {
                toast.error("Email Already In Use");
            }
            if (error.code === "auth/invalid-email") {
                toast.error("Invalid Email Address");
            }
            if (error.code === "auth/missing-password") {
                toast.error("Provide a password");
            }
        });
};
  return (
    <div className="h-3/5 bg-black flex  items-center justify-center">
      <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
        <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
          <h5 className="text-3xl">Register</h5>
          <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-200"
              >
                Name
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-200"
              >
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-200"
              >
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
            <Button size="large">{loading ? "loading" : "Register"}</Button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
