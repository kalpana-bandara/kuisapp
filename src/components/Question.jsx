import { useParams } from "react-router-dom";

export default function Question() {
  const { id } = useParams();
  return "hello";
}
