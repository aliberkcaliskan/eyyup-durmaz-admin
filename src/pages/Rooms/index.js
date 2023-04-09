import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import ActionButtons from "../../components/ActionButtons";
import { LoadingContext } from "../../context/Loading";
import { useFetch } from "../../hooks/use-fetch";
import { getRooms, deleteRooms } from "../../service/rooms";
import { ToasterContext } from "../../context/ToasterContext";
import { tryCatch } from "@thalesrc/js-utils";
import pageURL from "../../utils/pageUrls";
import { confirmDialog } from 'primereact/confirmdialog';
import { getClinics } from "../../service/clinics";
import { ConfirmDialog } from 'primereact/confirmdialog';
import SearchBar from "../../components/SearchBar";

export default function Rooms() {
  const { setLoading, showLoading, hideLoading } = useContext(LoadingContext);
  const { push } = useHistory();
  const [clinicsList] = useFetch(() => getClinics(), [], { setLoading, reloadDeps: [], deps: [] });
  const [data, setData] = useState([]);
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
        const [err] = await tryCatch(deleteRooms(data.id));
        if (err) {
          hideLoading();
          openToaster("bottom-right", { severity: "error", summary: 'Hata', detail: "Silme İşlemi Başarısız", life: 3000 });
          return;
        }
        hideLoading();
        openToaster("bottom-right", { severity: "success", summary: 'Başarılı', detail: 'Silme İşlemi Başarılı', life: 3000 });
      },
    });
  })

  const handleSearch = async (data) => {
    showLoading();
    if (data?.clinicId) {
      const [err, res] = await tryCatch(getRooms(data.clinicId));
      if (err) {
        hideLoading();
        openToaster("bottom-right", { severity: "info", summary: 'Uyarı', detail: "Kayıt Bulunamadı", life: 3000 });
        return;
      }
      setData(res);
    } else {
      openToaster("bottom-right", { severity: "info", summary: 'Uyarı', detail: "Lütfen Klinik Seçiniz", life: 3000 });
      hideLoading();
    }
  };

  const searchItems = [
    {
      label: 'Klinik',
      name: "clinicId",
      component: "dropdown",
      options: clinicsList,
      optionLabel: "name",
      optionValue: "id",
    },
  ];

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <SearchBar items={searchItems} handleSearch={(data) => handleSearch(data)} />
        </div>
        <div className="card">
          <ActionButtons customStyle="flex align-content-center justify-content-start mb-4">
            <Button onClick={() => push(`${pageURL.rooms}/ekle`)} label="Oda Ekle" />
          </ActionButtons>
          <DataTable value={data} scrollable scrollHeight="600px" responsiveLayout="scroll" emptyMessage="Veri Bulunamadı">
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
                    <Button type="button" label='Düzenle' onClick={() => push(`${pageURL.rooms}/duzenle/${rowData.id}`)} />
                    <Button type="button" label='Detay' onClick={() => push(`${pageURL.rooms}/detay/${rowData.id}`)} />
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
