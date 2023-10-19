import { FC, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CreateRecordingProps } from "./CreateRecording.type";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import Text from "@/app/ui/Text";
import Icon from "@/app/ui/Icon";
import { classNames } from "@/app/shared/utils/helpers";

const CreateRecording: FC<CreateRecordingProps> = (props) => {
  const { audioName = "", getAudio } = props;
  const [audio, setAudio] = useState<string>("");
  const [isPaused, setIsPaused] = useState(false);

  type StateRecordingType = "INIT" | "PAUSE" | "RECORDING" | "STOP";

  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [stateRecording, setStateRecording] =
    useState<StateRecordingType>("INIT");
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const handleChangeRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        // El usuario ha dado permiso para acceder al micrófono, puedes continuar
        setStateRecording("RECORDING");
        const media = new MediaRecorder(stream);
        if (media !== null) {
          mediaRecorder.current = media;
          mediaRecorder.current.start();
          let localAudioChunks: Blob[] = [];
          mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
          };

          setAudioChunks(localAudioChunks);
        }
      })
      .catch(function (error) {
        // El usuario ha denegado el acceso al micrófono o ha ocurrido un error
        toast.warning(
          "Tiene que aceptar los permisos para poder realizar la grabación"
        );
      });
  };

  const handleStopRecording = () => {
    //stops the recording instance
    if (mediaRecorder.current !== null) {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        setStateRecording("STOP");
        //creates a blob file from the audiochunks data
        const audioBlob = new Blob(audioChunks);
        //creates a playable URL from the blob file.
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);
      };
    }
  };

  const handleResumeRecording = () => {
    setIsPaused(false);
    //stops the recording instance
    if (mediaRecorder.current !== null) {
      mediaRecorder.current.resume();
    }
  };

  const handlePauseRecording = () => {
    setIsPaused(true);
    //stops the recording instance
    if (mediaRecorder.current !== null) {
      mediaRecorder.current.pause();
    }
  };

  const handleSubmitRecording = () => {
    if (getAudio) getAudio(audioChunks);
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
        {stateRecording === "STOP" && (
          <audio className="w-full" controls src={audio}></audio>
        )}
        {stateRecording !== "STOP" && (
          <Container
            size={{ width: "w-full", height: "h-full" }}
            display="flex"
            justify="justify-center"
            align="items-center"
          >
            <Icon
              className={classNames(
                stateRecording === "RECORDING" && !isPaused
                  ? "animate-pulse "
                  : ""
              )}
              remixicon="ri-record-circle-line"
              font={{
                size: "text-7xl",
                color:
                  stateRecording === "RECORDING" && !isPaused
                    ? "text-red-500"
                    : isPaused
                    ? "text-green-500"
                    : "text-gray-500",
              }}
            />
          </Container>
        )}
      </Container>
      <Container
        display="flex"
        flexDirection="flex-row"
        flexWrap="flex-nowrap"
        justify="justify-center"
        gap="gap-4"
      >
        {stateRecording === "INIT" && (
          <Button
            rounded="rounded-full"
            size={{ width: "w-12", height: "h-12" }}
            remixicon="ri-play-fill"
            font={{
              color: "text-white",
              weight: "font-semibold",
              size: "text-3xl",
            }}
            onClick={handleChangeRecording}
          />
        )}
        {stateRecording === "RECORDING" && (
          <>
            <Button
              rounded="rounded-full"
              size={{ width: "w-12", height: "h-12" }}
              remixicon={isPaused ? "ri-play-fill" : "ri-pause-fill"}
              font={{
                color: "text-white",
                weight: "font-semibold",
                size: "text-3xl",
              }}
              onClick={isPaused ? handleResumeRecording : handlePauseRecording}
            />
            <Button
              rounded="rounded-full"
              size={{ width: "w-12", height: "h-12" }}
              remixicon="ri-stop-fill"
              font={{
                color: "text-red-500",
                weight: "font-semibold",
                size: "text-3xl",
              }}
              onClick={handleStopRecording}
            />
          </>
        )}
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
