"use server"
import LoginForm from '@/components/loginForm'

const RegisterPage = () => {

  const formProps = {
    title: "Create your PopX account",
    button: "Create Account",
    formData: [

      {
        type: "Full_Name" as const,
      }, 
      {
        type: "Phone_No" as const,
      }, 
      {
        type: "Email_Address" as const,
      }, 
      {
        type: "Password" as const,
      }, 
      {
        type: "Company_Name" as const,
      }, 
    ],
    isRegister: true
  }

  return (
    <div className='h-full'>
      <LoginForm {...formProps} />
    </div>
  )
}

export default RegisterPage