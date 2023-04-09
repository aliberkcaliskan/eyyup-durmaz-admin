import React from "react";
import styled from "styled-components";
import { Button } from "primereact/button";
import ActionButtons from "./ActionButtons";

const Container = styled.div.attrs({
  className: "flex align-items-center justify-content-center",
})`
  gap: 10px;
`;

function PageActions({ items, className, actionButtons }, props) {
  return (
    <Container className={className}>
      {actionButtons
        ? items.map((btn, idx) => {
            return (
              <ActionButtons key={idx}>
                <Button code={btn.code} {...btn} />
              </ActionButtons>
            );
          })
        : items.map((btn, idx) => {
            return <Button key={idx} {...btn} />;
          })}
    </Container>
  );
}

export default PageActions;
