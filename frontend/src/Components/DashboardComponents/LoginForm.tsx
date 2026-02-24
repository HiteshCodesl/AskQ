import { Link, useNavigate } from "react-router-dom"
import { cn } from "../../lib/utils"
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
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginRequest = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, { email, password });

    if (response.data.success === true) {
      const token = response.data.token;
      localStorage.setItem('token', token);
      toast.success('Login Successfully');
      navigate('/dashboard');
    } else {
      toast.error(response.data.error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen mt-15">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center mb-5">Login to your account</CardTitle>

          </CardHeader>
          <CardContent>

            <FieldGroup>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
              </Field>
              <Field>
                <Button onClick={loginRequest} type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
