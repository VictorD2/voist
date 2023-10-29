import { TranscriptionProps } from "./Transcription.type";
import { FC } from "react";

const Transcription: FC<TranscriptionProps> = (props) => {
  const { url } = props;
  return <iframe className="w-full h-screen" src={url}></iframe>;
};

export default Transcription;
