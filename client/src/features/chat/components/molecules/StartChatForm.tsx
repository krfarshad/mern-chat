import React, { useState } from "react";
import { Button, Card } from "@nextui-org/react";
import { Formik, Form, Field } from "formik";
import { FInput, FUpload, UsersMultiSelect } from "@/components";

const initialValuesPrivate = {
  type: "private",
  participants: "",
};

const initialValuesGroup = {
  type: "group",
  participants: [],
  name: "",
  avatar: null,
};

export const StartChatForm = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (values: any) => {
    console.log("Form Submitted:", values);
  };

  return (
    <Formik
      initialValues={initialValuesPrivate}
      //   validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex w-full max-w-md flex-col gap-4">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <Card
                isPressable
                onPress={() => setFieldValue("type", "private")}
                className={`border ${values.type === "private" ? "border-blue-500" : "border-gray-700"} rounded-lg p-4`}
              >
                <div className="flex items-center gap-2">
                  <span>Direct Chat</span>
                </div>
              </Card>
              <Card
                isPressable
                onPress={() => setFieldValue("type", "group")}
                className={`border ${values.type === "group" ? "border-blue-500" : "border-gray-700"} rounded-lg p-4`}
              >
                <div className="flex items-center gap-2">
                  <span>Group Chat</span>
                </div>
              </Card>
              <Button
                onClick={handleNextStep}
                color="primary"
                disabled={!values.type}
              >
                Next
              </Button>
            </div>
          )}

          {step === 2 && (
            <>
              {values.type === "private" && (
                <div>
                  <label htmlFor="participants">Participant Username</label>
                  <UsersMultiSelect name="participants" isMulti={false} />

                  <Field name="participants" placeholder="Enter username" />
                </div>
              )}

              {values.type === "group" && (
                <>
                  <div>
                    <label htmlFor="participants">Participants</label>
                    {/* <Field
                      name="participants"
                      placeholder="Enter usernames separated by commas"
                      component="textarea"
                      onChange={(e: any) => {
                        const usernames = e.target.value
                          .split(",")
                          .map((name: string) => name.trim());
                        setFieldValue("participants", usernames);
                      }}
                    /> */}
                    <UsersMultiSelect name="participants" isMulti />
                  </div>
                  <div>
                    <Field
                      name="name"
                      label="Group Name"
                      component={FInput}
                      placeholder="Enter group name"
                    />
                  </div>
                  <div>
                    <Field
                      label="Group Avatar"
                      name="avatar"
                      component={FUpload}
                    />
                  </div>
                </>
              )}

              <div className="mt-4 flex gap-2">
                <Button onClick={handlePreviousStep}>Back</Button>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};
