export default function UserInfo({match}: {match: any}){
    return <>user info: {match.params?.id}</>
}