"use server"
import LoginForm from "@/components/loginForm"


const LoginPage = () => {

    const formProps = {
            title: "Signin to your PopX account",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            button: "Login",
            formData: [
              {
                type: "Email_Address" as const,
              }, {
                type: "Password" as const,
              }
            ],
            isRegister: false
        }

  return (
    <div className="h-full">
        <LoginForm {...formProps}/>
    </div>
  )
}

export default LoginPage
