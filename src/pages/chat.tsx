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
    <h1>
      {props.currentUser.username} id: {props.currentUser.uid}
    </h1>
  );
};

export default Chat;
