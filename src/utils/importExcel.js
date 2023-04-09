export const importExcel = async (e, importedCols, importedData) => {
  const file = e.files[0];
  import("xlsx").then((xlsx) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const wb = xlsx.read(e.target.result, { type: "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

      // Prepare DataTable
      const cols = data[0];
      data.shift();

      let _importedCols = cols.map((col) => ({ field: col, header: toCapitalize(col) }));
      let _importedData = data.map((d) => {
        return cols.reduce((obj, c, i) => {
          obj[c] = d[i];
          return obj;
        }, {});
      });
      importedCols(_importedCols);
      importedData(_importedData);
    };

    reader.readAsArrayBuffer(file);
    e.options.clear();
  });
};
const toCapitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
