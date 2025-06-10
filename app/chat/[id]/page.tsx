import Chat from "../../components/Chat";
import ChatInput from "../../components/ChatInput";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

type Props = {
  params: { chatId: string };
};

export default async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col h-screen">
      {/* ✅ Mesajlar */}
      <Chat chatId={chatId} />

      {/* ✅ Input alanı */}
      <ChatInput chatId={chatId} />
    </div>
  );
}
