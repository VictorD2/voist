"use client";
import { FC, useState } from "react";
import { ReactMic, ReactMicStopEvent } from "react-mic";
import { CreateRecordingProps } from "./CreateRecording.type";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import Text from "@/app/ui/Text";
import { toast } from "react-toastify";

const CreateRecording: FC<CreateRecordingProps> = (props) => {
  const { audioName = "", getAudio } = props;
  const [isRecording, setIsRecording] = useState(false);
  type StateRecordingType = "INIT" | "RECORDING" | "STOP";
  const [audioChunks, setAudioChunks] = useState<Blob>();

  const [stateRecording, setStateRecording] =
    useState<StateRecordingType>("INIT");

  const handleChangeRecording = async () => {
    setIsRecording(true);
    setStateRecording("RECORDING");
  };

  const handleStopRecording = () => {
    //stops the recording instance
    setStateRecording("STOP");
    setIsRecording(false);
  };

  const handleSubmitRecording = () => {
    if (getAudio && audioChunks) getAudio(audioChunks);
  };

  const onData = (recordedBlob: Blob) => {};

  const onStop = (recordedBlob: ReactMicStopEvent) => {
    setAudioChunks(recordedBlob.blob);
  };

  return (
    <>
      <Container
        display="flex"
        flexDirection="flex-row"
        flexWrap="flex-nowrap"
        justify="justify-center"
        align="items-center"
        gap="gap-5"
      >
        <Text
          size={{ width: "" }}
          text={audioName}
          font={{ size: "text-2xl", weight: "font-semibold" }}
          display="inline"
        />
      </Container>
      <Container size={{ height: "h-36" }}>
        <Container
          size={{ width: "w-full", height: "h-full" }}
          display="flex"
          justify="justify-center"
          align="items-center"
        >
          <ReactMic
            record={isRecording}
            className="sound-wave"
            visualSetting="sinewave"
            onStop={onStop}
            onData={onData}
            mimeType="audio/wav"
            strokeColor="#5271FF"
            backgroundColor="#FFF"
          />
        </Container>
      </Container>
      <Container
        display="flex"
        flexDirection="flex-row"
        flexWrap="flex-nowrap"
        justify="justify-center"
        gap="gap-4"
      >
        <Button
          rounded="rounded-full"
          size={{ width: "w-12", height: "h-12" }}
          remixicon="ri-play-fill"
          font={{
            color: "text-white",
            weight: "font-semibold",
            size: "text-3xl",
          }}
          disabled={isRecording}
          onClick={handleChangeRecording}
        />
        <Button
          rounded="rounded-full"
          size={{ width: "w-12", height: "h-12" }}
          remixicon="ri-stop-fill"
          font={{
            color: "text-white",
            weight: "font-semibold",
            size: "text-3xl",
          }}
          disabled={!isRecording}
          onClick={handleStopRecording}
        />
        {stateRecording === "STOP" && (
          <Button
            text="Guardar"
            font={{
              color: "text-white",
              weight: "font-semibold",
            }}
            onClick={handleSubmitRecording}
          />
        )}
      </Container>
    </>
  );
};

export default CreateRecording;
