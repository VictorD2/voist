"use client";
import { FC, useEffect, useRef, useState } from "react";
import { CreateRecordingProps } from "./CreateRecording.type";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import Text from "@/app/ui/Text";
import { toast } from "react-toastify";
import audioBufferToWav from "audiobuffer-to-wav";

const CreateRecording: FC<CreateRecordingProps> = (props) => {
  const { audioName = "", getAudio } = props;
  const [isRecording, setIsRecording] = useState(false);
  type StateRecordingType = "INIT" | "RECORDING" | "STOP";
  const [audioChunks, setAudioChunks] = useState<Blob>();
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioStream = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stateRecording, setStateRecording] =
    useState<StateRecordingType>("INIT");

  useEffect(() => {
    setIsRecording(false);
    if (mediaRecorder.current) {
      mediaRecorder.current.ondataavailable = null;
      mediaRecorder.current.onstop = null;
      mediaRecorder.current = null;
    }
    if (audioStream.current) {
      audioStream.current.getTracks().forEach((track) => track.stop());
      audioStream.current = null;
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const visualize = (stream: MediaStream) => {
        const audioContext = new window.AudioContext();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current!;
        const canvasContext = canvas.getContext("2d")!;
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        const drawWaveform = () => {
          analyser.getByteTimeDomainData(dataArray);

          canvasContext.fillStyle = "rgb(255, 255, 255)";
          canvasContext.fillRect(0, 0, canvas.width, canvas.height);
          canvasContext.lineWidth = 5;
          canvasContext.strokeStyle = "rgb(82, 113, 255)";

          canvasContext.beginPath();

          const sliceWidth = (canvas.width * 1.0) / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height) / 2;

            if (i === 0) {
              canvasContext.moveTo(x, y);
            } else {
              canvasContext.lineTo(x, y);
            }

            x += sliceWidth;
          }

          canvasContext.lineTo(canvas.width, canvas.height / 2);
          canvasContext.stroke();

          if (isRecording) {
            requestAnimationFrame(drawWaveform);
          }
        };

        drawWaveform();
      };
      if (isRecording && audioStream.current) {
        visualize(audioStream.current);
      }
    }
  }, [isRecording]);

  const handleChangeRecording = async () => {
    setAudioChunks(undefined);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioStream.current = stream;

        mediaRecorder.current = new MediaRecorder(stream);

        const audioChunks = [];

        mediaRecorder.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
            setAudioChunks((prevBlob) => {
              const newBlob = prevBlob
                ? new Blob([prevBlob, event.data], { type: "audio/wav" })
                : new Blob([event.data], { type: "audio/wav" });
              return newBlob;
            });
          }
        };
        mediaRecorder.current.onstop = () => {
          setIsRecording(false);
        };
        mediaRecorder.current.start();
        setIsRecording(true);
        setStateRecording("RECORDING");
      })
      .catch((error) => toast.warning("Error al acceder al micrófono: "));
  };

  const handleStopRecording = () => {
    //stops the recording instance
    setStateRecording("STOP");
    setIsRecording(false);
    let chunks: Blob[] = [];
    if (mediaRecorder.current && audioStream.current) {
      mediaRecorder.current.stop();
      audioStream.current.getTracks().forEach((track) => track.stop());
    }
    if (mediaRecorder.current) {
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        // Convert the recorded audio chunks into an ArrayBuffer
        const audioData = new Blob(chunks, { type: "audio/wav" });
        const arrayBuffer = await audioData.arrayBuffer();

        // Create an AudioBuffer from the ArrayBuffer
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        // Convert the AudioBuffer to WAV using the audioBufferToWav function
        const wavBlob = audioBufferToWav(audioBuffer);

        // Create a Blob from the WAV data
        const audioBlob2 = new Blob([wavBlob], { type: "audio/wav" });
        setAudioChunks(audioBlob2);
      };
    }
  };

  const handleSubmitRecording = () => {
    if (getAudio && audioChunks) getAudio(audioChunks);
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
          <canvas className="w-full h-32" ref={canvasRef}></canvas>
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
