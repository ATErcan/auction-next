import RegisterForm from "@/components/register/RegisterForm";
import Container from "@/components/ui/Container";

const RegisterPage = () => {
  return (
    <Container>
      <h1 className="max-w-lg mx-auto font-bold text-3xl mb-4">Register</h1>
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
