import { useContext } from "react";
import { RouterContext } from "../Router";

export default function useParams() {
    const { match } = useContext(RouterContext)
    console.log(match)
    return match?.params || {}
}