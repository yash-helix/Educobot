import * as React from "react";

function UserRed(props: React.SVGProps<SVGSVGElement>){
    return (
    <svg width={props.width} height={props.height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.48" d="M49.9997 45.8333C59.2044 45.8333 66.6663 38.3714 66.6663 29.1667C66.6663 19.9619 59.2044 12.5 49.9997 12.5C40.7949 12.5 33.333 19.9619 33.333 29.1667C33.333 38.3714 40.7949 45.8333 49.9997 45.8333Z" fill="url(#paint0_linear_1245_32453)"/>
<path d="M74.9997 87.5C77.3009 87.5 79.1663 85.6345 79.1663 83.3333C79.1663 67.225 66.108 54.1667 49.9997 54.1667C33.8914 54.1667 20.833 67.225 20.833 83.3333C20.833 85.6345 22.6985 87.5 24.9997 87.5H74.9997Z" fill="url(#paint1_linear_1245_32453)"/>
<defs>
<linearGradient id="paint0_linear_1245_32453" x1="16.6663" y1="29.1667" x2="49.9997" y2="62.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFA48D"/>
<stop offset="1" stop-color="#B72136"/>
</linearGradient>
<linearGradient id="paint1_linear_1245_32453" x1="-8.33366" y1="70.8333" x2="20.3843" y2="121.09" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFA48D"/>
<stop offset="1" stop-color="#B72136"/>
</linearGradient>
</defs>
</svg>
    )
}
const MemoIcon_UserRed = React.memo(UserRed);
export default MemoIcon_UserRed;
