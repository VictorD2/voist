import ProtectedRoutes from "@/app/shared/routes/ProtectedRoutes";
import Container from "@/app/ui/Container";
import Text from "@/app/ui/Text";
import { NextPage } from "next";

const MySpacePage: NextPage = () => {
  return (
    <ProtectedRoutes>
      <Container size={{ width: "w-full" }}>
        {/* Title */}
        <Text
          text="Mi unidad"
          font={{ weight: "font-medium", size: "text-xl" }}
        />
      </Container>
    </ProtectedRoutes>
  );
};

export default MySpacePage;
