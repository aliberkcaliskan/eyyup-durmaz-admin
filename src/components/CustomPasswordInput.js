import React from "react";
import { Password } from "primereact/password";
import styled from "styled-components";
import media from "../utils/media";

const Container = styled.div`
  input {
    min-width: ${(p) => p.minWidth};

    ${media.xs`
      min-width: 100%;
    `}
  }
`;

function CustomPasswordInput({ errorMsg, disabled, className, containerClassName, feedback = false, footer, header, onChange, value, name, label, required = false, minWidth = "250px", maxLength, keyfilter, type = "text" }) {
  return (
    <Container minWidth={minWidth} className={containerClassName}>
      <span className="p-float-label">
        <Password disabled={disabled} inputClassName="w-full" type={type} feedback={feedback} id={name} header={header} footer={footer} toggleMask value={value} name={name} onChange={onChange} autoComplete="off" className={className} maxLength={maxLength} keyfilter={keyfilter} />
        <label htmlFor={name}>
          {required && <span className="text-pink-500">*</span>}
          {label}
        </label>
      </span>
      {errorMsg && errorMsg}
    </Container>
  );
}

export default CustomPasswordInput;
