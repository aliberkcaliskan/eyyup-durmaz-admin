import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import styled from "styled-components";
import media from "../utils/media";
import classNames from "classnames";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    min-width: ${(p) => p.minWidth};

    ${media.xs`
      min-width: 100%;
    `}
  }
  .p-float-label {
    width: 100%;
  }

  ${({ mode }) => mode === "basic" &&
    `
    .p-float-label, .p-fileupload-choose, .p-fileupload-basic{
    height: 300px;
    width: 300px;
    background: transparent;
    color: black;
    text-align:center;
    justify-content: center;
    border-radius: 50%;

    .p-button-label{
      flex: initial;
    }
  }
  .p-fileupload-basic {
    position: absolute;
    top:0;
    left:0;
  }

  .p-fileupload-choose-selected{
    span{
      display: none !important;
    }
  }

  .p-fileupload-choose-selected:hover{
    span{
      display: block !important;
    }
  }
  `}
`;

function CustomFileUpload({ mode = "basic", errorMsg, accept, disabled, className, containerClassName, onChange, value, name, label, required = false, minWidth = "250px", emptyTemplate }) {
  const [imgSrc, setimgSrc] = useState("");
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  const onBasicUpload = () => {
    toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded with Basic Mode" });
  };
  const headerTemplate = (options) => {
    const { className, chooseButton, cancelButton } = options;

    return (
      <div className={className} style={{ backgroundColor: "transparent", display: "flex", alignItems: "center" }}>
        {chooseButton}
        {cancelButton}
      </div>
    );
  };

  const handleChange = (e) => {
    onChange(e);
    setimgSrc(e.files[0].objectURL);
  };

  const handleClear = () => {
    setimgSrc("");
  };

  return (
    <Container minWidth={minWidth} className={containerClassName} isImg={imgSrc ? true : false} mode={mode}>
      <span className="p-float-label">
        {imgSrc && <img style={{ objectFit: "cover", borderRadius: "50%" }} width="100%" height="100%" src={imgSrc} alt=""></img>}
        <FileUpload
          mode={mode}
          ref={fileUploadRef}
          disabled={disabled}
          id={name}
          value={value}
          name={name}
          onSelect={(e) => handleChange(e)}
          autoComplete="off"
          onUpload={onBasicUpload}
          onBeforeSend={() => {}}
          headerTemplate={headerTemplate}
          emptyTemplate={emptyTemplate}
          className={classNames(className, { "p-invalid": errorMsg })}
          onClear={handleClear}
          accept={accept}
        />
        <label htmlFor={name}>
          {errorMsg && <span className="text-pink-500">*</span>}
          {label}
        </label>
      </span>
      {errorMsg && errorMsg}
    </Container>
  );
}

export default CustomFileUpload;
