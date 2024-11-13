import { Field, Form, Formik } from "formik";
import { FInput, FSubmit, FUpload } from "@/components/Fields";
import { completeProfile } from "../../../api/completeProfile";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { completeProfileSchema } from "@/features/auth/utils/completeProfileSchema";
import { useSession } from "next-auth/react";

export const CompleteProfile = () => {
  const { data: session, update: sessionUpdate } = useSession();

  const router = useRouter();
  const initValues = {
    displayName: "",
    bio: "",
    avatar: "",
  };

  const submitFormHandler = async (values: typeof initValues) => {
    const result = await completeProfile({ values });
    if (result.status == 202) {
      toast.success(result.message ?? `Welcome ${result.data.displayName}`);
      await sessionUpdate({
        ...session,
        user: {
          ...session?.user,
          displayName: result.data.displayName,
          bio: result.data.bio,
          avatar: result.data.avatar,
        },
      });
      router.push("/");
    } else {
      toast.error(result.message ?? "Something wrong with your request!");
    }
  };
  return (
    <>
      <div>
        <p className="mb-4 text-center text-sm leading-6 text-gray-100">
          Hello, Please complete your profile.
        </p>
      </div>
      <Formik
        initialValues={initValues}
        onSubmit={submitFormHandler}
        validationSchema={completeProfileSchema}
      >
        <Form>
          <Field
            component={FInput}
            label="Display Name"
            name="displayName"
            required
          />
          <Field
            component={FInput}
            label="Short sentence for bio"
            name="bio"
            type="text"
            required
          />
          <Field component={FUpload} label="Avatar" name="avatar" />
          <Field className="mt-4" component={FSubmit} label="submit" />
        </Form>
      </Formik>
    </>
  );
};
