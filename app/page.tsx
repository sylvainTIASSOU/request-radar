'use client';
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoadingComp from "@/components/LoadingComp";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Api } from "./api/Api";
import { logIn } from "@/redux/features/auth-slice";
import Cookies from "js-cookie";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast()


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(" Email invalide")
        .required("Email est requis"),
      password: Yup.string().required("mot de passe requis "),
    }),
    onSubmit: async (values) => {
     
      setLoading(true);
      
      const data = {
        username: values.email, password: values.password
      };
      const response = await Api.createFormEncoded("login", data);

     
      
      if(response.data && response.data.ok){
        const auth = {
          isAuth: true,
          uid: response.data.user.id,
          role: "",
          
          name: `${response.data.user.username}`,
          
        };
        dispatch(logIn(auth));
        const expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 3); // Ajoute 3 heures à l'heure actuelle


        Cookies.set('token', response.data.access_token, { expires: expireDate, path: '/' });
        setLoading(false);
        toast({
          title: "Vous êtes connecté",
          className: "bg-colorSecondary text-white fixed top-2 right-2 w-[420px] ",

        })
        router.push("/dashboard");
    } else {
      setLoading(false);
      toast({
        title: "Le mot de passe ou l'email sont incorrects",
        variant: "destructive",
        className: "text-white fixed top-2 right-2 w-[420px] ",

      })
    }
    },
  })
  return (
    <div className="h-screen flex 2xl:mx-[20rem]  gap-2 items-center content-center justify-center md:mx-32 mx-4">
         {loading && <LoadingComp />}

       <div className="w-full flex flex-col gap-2 relative bottom-10">
       <div className="w-full block md:hidden">
        <Image src="/images/computer-work-6.png" alt="logo" width={400} height={300} className="object-cover relative   block md:hidden" />
      </div>


        <h1 className="text-4xl font-bold">Connectez-vous à votre compte <span className="text-colorSecondary text-4xl">.</span> </h1>

        <Link href={"/"} className="text-md font-light">Mot de Passe oublié <span className="text-colorSecondary text-3xl">.</span></Link>

        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4 mt-1 ">
        <div>
            <label htmlFor="email" className={formik.errors.email && formik.touched.email ? "text-red-500" : ""}>
              {formik.errors.email && formik.touched.email ? formik.errors.email : "Votre Email"}

            </label>
            <Input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
          </div>

          <div>
            <label htmlFor="mot de passe" className={formik.errors.password && formik.touched.password ? "text-red-500" : ""}>
              {formik.errors.password && formik.touched.password ? formik.errors.password : "Mot de Passe"}

            </label>
            <Input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
          </div>

          <Button type="submit" size={"lg"} className="w-full font-bold bg-colorSecondary" >Se Connecter</Button>
        </form>
      </div>


      <div className="w-full hidden md:block">
        <Image src="/images/computer-work-6.png" alt="logo" width={400} height={300} className="object-cover relative  hidden md:block" />
      </div>

     
    </div>
  );
}
