import * as React from "react";

function UserYellow(props: React.SVGProps<SVGSVGElement>){
    return (
    <svg width={props.width} height={props.height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.48" d="M50.0002 45.8333C59.2049 45.8333 66.6668 38.3714 66.6668 29.1667C66.6668 19.9619 59.2049 12.5 50.0002 12.5C40.7954 12.5 33.3335 19.9619 33.3335 29.1667C33.3335 38.3714 40.7954 45.8333 50.0002 45.8333Z" fill="url(#paint0_linear_1122_34615)"/>
    <path d="M75.0002 87.5C77.3013 87.5 79.1668 85.6345 79.1668 83.3333C79.1668 67.225 66.1085 54.1667 50.0002 54.1667C33.8919 54.1667 20.8335 67.225 20.8335 83.3333C20.8335 85.6345 22.699 87.5 25.0002 87.5H75.0002Z" fill="url(#paint1_linear_1122_34615)"/>
    <defs>
    <linearGradient id="paint0_linear_1122_34615" x1="16.6668" y1="29.1667" x2="50.0002" y2="62.5" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FFE16A"/>
    <stop offset="1" stop-color="#B78103"/>
    </linearGradient>
    <linearGradient id="paint1_linear_1122_34615" x1="-8.33317" y1="70.8333" x2="20.3848" y2="121.09" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FFE16A"/>
    <stop offset="1" stop-color="#B78103"/>
    </linearGradient>
    </defs>
    </svg>   
    )
}

const MemoIcon_UserYellow = React.memo(UserYellow);
export default MemoIcon_UserYellow;