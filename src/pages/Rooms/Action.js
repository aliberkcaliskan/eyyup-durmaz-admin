/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { tryCatch } from "@thalesrc/js-utils";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import CustomForm from "../../components/CustomForm";
import PageActions from "../../components/PageActions";
import { LoadingContext } from "../../context/Loading";
import { ToasterContext } from "../../context/ToasterContext";
import { useFetch } from "../../hooks/use-fetch";
import { addClinics, getClinicsDetail, updateClinics } from "../../service/clinics";

const RoomsAction = () => {
  const history = useHistory();
  const { id } = useParams();
  const { mode } = useParams();
  const { setLoading, showLoading, hideLoading } = useContext(LoadingContext);
  const { openToaster } = useContext(ToasterContext);
  const [clinicDetail, reloadClinicDetail] = useFetch(() => (id ? getClinicsDetail(id) : () => { }), {}, { setLoading, reloadDeps: [id], deps: [id] });

  const btnItems = [{ label: 'Geri Dön', onClick: () => history.goBack(), className: "p-button-raised p-button-text" }];

  if (mode === "duzenle" || mode === "ekle") {
    btnItems.push({
      label: 'Kaydet',
      type: "submit",
      onClick: () => {
        formik.handleSubmit();
      },
    });
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Zorunlu Alan').min(3, 'Zorunlu Alan'),
    address: Yup.string().required('Zorunlu Alan'),
    phoneNumber: Yup.string().required('Zorunlu Alan').min(11, 'En fazla 11 Karakter'),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      showLoading();
      const [err, res] = await tryCatch(mode === "duzenle" ? updateClinics(data) : addClinics(data));

      if (err) {
        hideLoading();
        openToaster("bottom-right", { severity: "error", summary: 'Hata', detail: 'Verilerin Doğruluğundan emin olun.', life: 3000 });
        return;
      }
      openToaster("bottom-right", { severity: "success", summary: 'Kaydetme', detail: 'İşlem Başarılı', life: 3000 });

      hideLoading();
      formik.resetForm();
      reloadClinicDetail();
      history.goBack();
    },
  });
  useEffect(() => {
    if (mode === "detay" || mode === "duzenle") {
      const { id, name, address, phoneNumber } = clinicDetail;

      formik.setValues({
        id: id || "",
        name: name || "",
        phoneNumber: phoneNumber || "",
        address: address || "",
      });
    }
  }, [clinicDetail]);

  const formItems = [
    {
      label: 'Klinik Adı',
      name: "name",
      component: "input",
    },
    {
      label: 'Telefon Numarası',
      name: "phoneNumber",
      component: "input",
    },
    {
      label: 'Adres',
      name: "address",
      component: "textarea",
    },
  ];
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card ">
          <CustomForm items={formItems} data={formik} handleChange={formik.handleChange} mode={mode} />
        </div>
        <PageActions items={btnItems} />
      </div>
    </div>
  );
};
export default RoomsAction;
