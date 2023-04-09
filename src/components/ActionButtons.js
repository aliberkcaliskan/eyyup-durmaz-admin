import React from "react";

export default function ActionButtons(props) {
  return (
    <div className={`${props.customStyle ? props.customStyle : "flex align-content-center justify-content-center"}`} style={{ gap: "10px" }}>
      {Array.isArray(props.children) ? (
        React.Children.map(
          props.children.filter((item) => item !== null),
          (child) => {
            return <>{child}</>;
          }
        )
      ) : (
        <>{props.children}</>
      )}
    </div>
  );
}
