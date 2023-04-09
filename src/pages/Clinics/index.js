import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import ActionButtons from "../../components/ActionButtons";
import { LoadingContext } from "../../context/Loading";
import { useFetch } from "../../hooks/use-fetch";
import { getClinics, deleteClinics } from "../../service/clinics";
import { ToasterContext } from "../../context/ToasterContext";
import { tryCatch } from "@thalesrc/js-utils";
import pageURL from "../../utils/pageUrls";
import { confirmDialog } from 'primereact/confirmdialog';
import { ConfirmDialog } from 'primereact/confirmdialog';

export default function Clinics() {
  const { setLoading, showLoading, hideLoading } = useContext(LoadingContext);
  const { push } = useHistory();
  const [clinicsList, reloadClinicsList] = useFetch(() => getClinics(), [], { setLoading, reloadDeps: [], deps: [] });
  const { openToaster } = useContext(ToasterContext);
  const onDelete = ((data) => {
    confirmDialog({
      message: 'Silmek İstediğinize Emin misiniz?',
      header: data.name,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: async () => {
        showLoading();
        const [err] = await tryCatch(deleteClinics(data.id));
        if (err) {
          hideLoading();
          openToaster("bottom-right", { severity: "error", summary: 'Hata', detail: "Silme İşlemi Başarısız", life: 3000 });
          return;
        }
        hideLoading();
        openToaster("bottom-right", { severity: "success", summary: 'Başarılı', detail: 'Silme İşlemi Başarılı', life: 3000 });
        reloadClinicsList();
      },
    });
  })

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <ActionButtons customStyle="flex align-content-center justify-content-start mb-4">
            <Button onClick={() => push(`${pageURL.clinics}/ekle`)} label="Klinik Ekle" />
          </ActionButtons>
          <DataTable value={clinicsList} scrollable scrollHeight="600px" responsiveLayout="scroll" emptyMessage="Veri Bulunamadı">
            <Column field="name" header={'Klinik Adı'} />
            {/* <Column
              field="isActive"
              header="Aktif"
              body={(rowData) => {
                return <div>{rowData.isActive ? "Aktif" : "Pasif"}</div>;
              }}
            /> */}
            <Column field="phoneNumber" header="Telefon Numarası" />
            <Column field="address" header="Adres" />
            <Column
              header="İşlemler"
              headerStyle={{ width: "4rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              body={(rowData) => {
                return (
                  <ActionButtons>
                    <Button type="button" label='Düzenle' onClick={() => push(`${pageURL.clinics}/duzenle/${rowData.id}`)} />
                    <Button type="button" label='Detay' onClick={() => push(`${pageURL.clinics}/detay/${rowData.id}`)} />
                    <Button type="button" label='Sil' onClick={() => onDelete(rowData)} />

                  </ActionButtons>
                );
              }}
            />
          </DataTable>
          <ConfirmDialog />
        </div>
      </div>
    </div>
  );
}
