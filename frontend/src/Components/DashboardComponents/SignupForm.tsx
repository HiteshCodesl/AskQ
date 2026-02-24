import { useState } from "react"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../ui/field"
import { Input } from "../ui/input"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupRequest = async() => {
    console.log("SignupReq send")
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,{email, name, password});

    console.log("response data", response.data);  
    if(response.data.success === true){
      toast.success("Signup Successfully");
       navigate('/login');
    }else{
      toast.error(response.data.error); 
    }
  } 

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-15">
      <CardHeader className="text-center">
        <CardTitle className="font-bold mb-5 text-xl">Create an account</CardTitle>
       
      </CardHeader>
      <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
            </Field>
            
            <FieldGroup>
              <Field>
                <Button onClick={signupRequest} type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
      </CardContent>
    </div>
  )
}
