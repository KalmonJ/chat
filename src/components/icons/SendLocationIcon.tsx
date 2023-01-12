import { ComponentPropsWithoutRef } from "react";

export const SendLocationIcon = (props: ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
      width="19"
      height="22"
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.1226 21.2957C13.7069 19.1791 18.5322 14.4917 18.5322 9C18.5322 4.02944 14.5028 0 9.53223 0C4.56166 0 0.532227 4.02944 0.532227 9C0.532227 14.4917 5.3576 19.1791 7.94184 21.2957C8.87878 22.0631 10.1857 22.0631 11.1226 21.2957ZM9.53223 11C11.1891 11 12.5322 9.65685 12.5322 8C12.5322 6.34315 11.1891 5 9.53223 5C7.87537 5 6.53223 6.34315 6.53223 8C6.53223 9.65685 7.87537 11 9.53223 11Z"
        fill="#777E91"
      />
    </svg>
  );
};
