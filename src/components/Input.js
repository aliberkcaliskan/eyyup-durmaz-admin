import React from "react";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import media from "../utils/media";
import classNames from "classnames";

const Container = styled.div`
  input {
    min-width: ${(p) => p.minWidth};

    ${media.xs`
      min-width: 100%;
    `}
  }
`;

function Input({ errorMsg, disabled, className, containerClassName, onChange, value, name, label, required = false, minWidth = "250px", maxLength, keyfilter, type = "text" }) {
  return (
    <Container minWidth={minWidth} className={containerClassName}>
      <span className="p-float-label">
        <InputText disabled={disabled} type={type} id={name} value={value} name={name} onChange={onChange} autoComplete="off" className={classNames(className, { "p-invalid": errorMsg })} maxLength={maxLength} keyfilter={keyfilter} />
        <label htmlFor={name}>
          {errorMsg && <span className="text-pink-500">*</span>}
          {label}
        </label>
      </span>
      {errorMsg && errorMsg}
    </Container>
  );
}

export default Input;
