import * as React from "react";

function UserGrey(props: React.SVGProps<SVGSVGElement>){
    return (
    <svg width={props.width} height={props.height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.48" d="M50.0002 45.8333C59.2049 45.8333 66.6668 38.3714 66.6668 29.1667C66.6668 19.9619 59.2049 12.5 50.0002 12.5C40.7954 12.5 33.3335 19.9619 33.3335 29.1667C33.3335 38.3714 40.7954 45.8333 50.0002 45.8333Z" fill="#637381"/>
<path d="M75.0002 87.5C77.3013 87.5 79.1668 85.6345 79.1668 83.3333C79.1668 67.225 66.1085 54.1667 50.0002 54.1667C33.8919 54.1667 20.8335 67.225 20.8335 83.3333C20.8335 85.6345 22.699 87.5 25.0002 87.5H75.0002Z" fill="#637381"/>
</svg>
    )
}

const MemoIcon_userGrey = React.memo(UserGrey);
export default MemoIcon_userGrey;