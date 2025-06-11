import Chat from "../../components/Chat";
import ChatInput from "../../components/ChatInput";

type Props = {
  params: { chatId: string };
};

export default function ChatPage({ params: { chatId } }: Props) {

  return (
    <div className="flex flex-col h-screen">
      {/* ✅ Mesajlar */}
      <Chat chatId={chatId} />

      {/* ✅ Input alanı */}
      <ChatInput chatId={chatId} />
    </div>
  );
}
