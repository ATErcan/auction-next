import LoginForm from "@/components/login/LoginForm";
import Container from "@/components/ui/Container";

const LoginPage = () => {
  return (
    <Container>
      <h1 className="max-w-lg mx-auto font-bold text-3xl mb-4">Login</h1>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;