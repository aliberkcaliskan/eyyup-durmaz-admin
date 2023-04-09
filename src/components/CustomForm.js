/* eslint-disable array-callback-return */
// import { Editor } from "primereact/editor";
import classNames from "classnames";
import React from "react";
import CustomCalendar from "./CustomCalendar";
import CustomDropdown from "./Dropdown";
import Input from "./Input";
import Textarea from "./Textarea";
import CustomMultiSelect from "./CustomMultiSelect";
import { Mode } from "../utils/mode";
import CustomPasswordInput from "./CustomPasswordInput";
import FileUpload from "./FileUpload";

const CustomForm = ({ items, data, handleChange, mode, isColumn }) => {
  let { values, touched, errors } = data;
  const isFormFieldValid = (name) => !!(touched[name] && errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error ml-2">{errors[name]}</small>;
  };

  return (
    <div className={isColumn ? "flex flex-column pt-3" : "formgrid grid pt-3"} style={{ gap: isColumn && "30px" }}>
      {items?.map((item, idx) => {
        const { name, label, tooltip, maxLength, keyfilter } = item;
        switch (item.component) {
          case "input":
            return (
              <div className={classNames({ "field mb-4 col md:col-6": !isColumn })} key={idx}>
                <Input
                  key={idx}
                  disabled={item?.disable || mode === Mode.DETAIL || mode === "detay"}
                  errorMsg={getFormErrorMessage(name)}
                  label={label}
                  name={name}
                  tooltip={tooltip}
                  tooltipOptions={"top"}
                  value={values[item.name] || ""}
                  onChange={handleChange}
                  className="w-full"
                  maxLength={maxLength}
                  keyfilter={keyfilter}
                />
              </div>
            );
          // case "radio":
          // return <CustomRadio key={idx} name={item.name} label={item.label} disabled={mode === Mode.DETAIL} onChange={handleChange} checked={data[item.name]} />;
          // case "editor":
          // return <Editor key={idx} placeholder={item.label} style={{ height: "200px" }} name={item.name} value={data[item.name] || ""} onTextChange={(e) => setEditor(item.name, e.htmlValue)} />;
          case "calendar":
            return (
              <div className={classNames({ "field mb-4 col md:col-6": !isColumn })} key={idx}>
                <CustomCalendar
                  key={idx}
                  disabled={item?.disable || mode === Mode.DETAIL || mode === "detay"}
                  {...item}
                  label={item.label}
                  name={item.name}
                  value={values[item.name] ? new Date(values[item.name]) : ""}
                  onChange={handleChange}
                  errorMsg={getFormErrorMessage(item.name)}
                  className="w-full"
                />
              </div>
            );
          case "textarea":
            return (
              <div className={classNames({ "field mb-4 col md:col-6": !isColumn })} key={idx}>
                <Textarea
                  key={idx}
                  disabled={item?.disable || mode === Mode.DETAIL || mode === "detay"}
                  label={item.label}
                  name={item.name}
                  tooltip={item.tooltip}
                  tooltipOptions={"top"}
                  value={values[item.name]}
                  onChange={handleChange}
                  errorMsg={getFormErrorMessage(item.name)}
                  className="w-full"
                  rows="10"
                  maxLength={2000}
                />
              </div>
            );
          case "dropdown":
            return (
              <div className={classNames({ "field mb-4 col md:col-6": !isColumn })} key={idx}>
                <CustomDropdown key={idx} disabled={item?.disable || mode === Mode.DETAIL || mode === "detay"} {...item} label={item.label} name={item.name} value={values[item.name]} onChange={handleChange} errorMsg={getFormErrorMessage(item.name)} className="w-full" rows="10" maxLength={200} />
              </div>
            );
          case "multiselect":
            return (
              <div className={classNames({ "field mb-4 col md:col-6": !isColumn })} key={idx}>
                <CustomMultiSelect key={idx} disabled={item?.disable || mode === Mode.DETAIL || mode === "detay"} {...item} label={item.label} name={item.name} value={values[item.name]} onChange={handleChange} errorMsg={getFormErrorMessage(item.name)} className="w-full" rows="10" maxLength={200} />
              </div>
            );
          case "password":
            return (
              <div className={classNames({ "field mb-4 col md:col-6": !isColumn })} key={idx}>
                <CustomPasswordInput key={idx} {...item} header={item.header} footer={item.footer} label={item.label} name={item.name} value={values[item.name]} onChange={handleChange} className="w-full" errorMsg={getFormErrorMessage(item.name)} />
              </div>
            );
          case "fileUpload":
            const handleFile = (e) => {
              data.setFieldValue(item.name, e.originalEvent.target.files[0]);
            };

            return (
              <div className={classNames({ "field mb-4 col md:col-12": !isColumn })} key={idx}>
                <FileUpload
                  accept={item.accept}
                  mode={item.mode}
                  key={idx}
                  disabled={item?.disable || mode === Mode.DETAIL || mode === "detay"}
                  {...item}
                  label={item.label}
                  name={item.name}
                  value={values[item.name]}
                  onChange={handleFile}
                  errorMsg={getFormErrorMessage(item.name)}
                  className="w-full"
                />
              </div>
            );
          default:
            break;
        }
      })}
    </div>
  );
};

export default CustomForm;
