import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";
import Container from "@/app/ui/Container";
import Text from "@/app/ui/Text";
import { NextPage } from "next";

const SharedPage: NextPage = () => {
  return (
    <ProtectedRoutes>
      <Container size={{ width: "w-full" }}>
        {/* Title */}
        <Text
          text="Compartido conmigo"
          font={{ weight: "font-medium", size: "text-xl" }}
        />
      </Container>
    </ProtectedRoutes>
  );
};

export default SharedPage;
