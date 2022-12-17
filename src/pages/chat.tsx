import { Header } from "components/common/Header";
import { Input } from "components/common/Input";
import { NextPageContext } from "next";
import { User, UserService } from "services/UserService";

interface ChatPageProps {
  currentUser: User;
}

export function getServerSideProps(ctx: NextPageContext) {
  const currentUser: User = UserService.get(ctx);
  return {
    props: {
      currentUser,
    },
  };
}

export const Chat = (props: ChatPageProps) => {
  return (
    <>
      <Header />
    </>
  );
};

export default Chat;
