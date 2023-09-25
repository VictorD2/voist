import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";
import Container from "@/app/ui/Container";
import Text from "@/app/ui/Text";

const ClassesPage = () => {
  return (
    <ProtectedRoutes>
      <Container size={{ width: "w-full" }}>
        {/* Title */}
        <Text
          text="Mis clases"
          font={{ weight: "font-medium", size: "text-xl" }}
        />
      </Container>
    </ProtectedRoutes>
  );
};

export default ClassesPage;
