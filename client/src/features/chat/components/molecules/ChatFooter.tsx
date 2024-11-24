import usePost from "@/hooks/usePost";
import { postMessage } from "../../api/postMessage";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { useWebSocket } from "@/context/SocketProvider";

type Props = {
  id: string;
};
const initValues = {
  text: "",
};

type ChatProps = typeof initValues;
export const ChatFooter = (props: Props) => {
  const { id } = props;
  const socket = useWebSocket();

  const { isPending, post } = usePost({
    postFn: postMessage,
  });

  const submitFormHandler = async (
    values: ChatProps,
    formikHelpers: FormikHelpers<ChatProps>,
  ) => {
    if (values.text) {
      const res = await post({
        values,
        chatId: id,
      });
      if (res.isSuccess && res.data?.status == 201) {
        formikHelpers.resetForm();

        const newMessage = {
          roomId: id,
          sender: { username: res.data.data.sender },
          message: res.data.data.text,
        };
        socket && socket.emit("newMessage", newMessage);
      } else {
        toast.error(res.data?.message ?? "Failed send message!");
      }
    }
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={async (values, formikHelpers) =>
        await submitFormHandler(values, formikHelpers)
      }
    >
      <Form>
        <div className="flex h-16 w-full flex-row items-center bg-white p-3 light">
          <div className="ml-4 flex-grow">
            <div className="relative w-full">
              <Field
                name="text"
                render={({ field }: any) => (
                  <input
                    {...field}
                    className="bg-sate-400 flex h-10 w-full rounded-xl border pl-4 focus:border-indigo-300 focus:outline-none"
                  />
                )}
              />
            </div>
          </div>
          <div className="ml-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500 px-4 py-1 text-white hover:bg-indigo-600 disabled:cursor-not-allowed"
            >
              <span>Send</span>
              <span className="ml-2">
                <svg
                  className="-mt-px h-4 w-4 rotate-45 transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
