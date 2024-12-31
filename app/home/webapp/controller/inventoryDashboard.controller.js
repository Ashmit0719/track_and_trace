sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("app.home.controller.inventoryDashboard", {
        onInit() {

            var oData = {
                materials: [
                    { packaging: "BOX1", productCode: "P001", batchId: "B001", manufacturingDate: "2024-01-01", expiryDate: "2025-01-01", qrCode: "", productionCode: "PR001", ICCode: "" },
                    { packaging: "BOX2", productCode: "P001", batchId: "B001", manufacturingDate: "2024-02-01", expiryDate: "2025-02-01", qrCode: "", productionCode: "PR001", ICCode: "" },
                    { packaging: "BOX3", productCode: "P001", batchId: "B001", manufacturingDate: "2024-02-01", expiryDate: "2025-02-01", qrCode: "", productionCode: "PR001", ICCode: "" },
                    { packaging: "BOX4", productCode: "P001", batchId: "B001", manufacturingDate: "2024-03-01", expiryDate: "2025-03-01", qrCode: "", productionCode: "PR001", ICCode: "" },
                    { packaging: "BOX5", productCode: "P002", batchId: "B002", manufacturingDate: "2024-03-01", expiryDate: "2025-03-01", qrCode: "", productionCode: "PR001", ICCode: "" },
                    { packaging: "BOX6", productCode: "P002", batchId: "B002", manufacturingDate: "2024-01-01", expiryDate: "2025-01-01", qrCode: "", productionCode: "PR001", ICCode: "" },
                    { packaging: "BOX7", productCode: "P002", batchId: "B002", manufacturingDate: "2024-02-01", expiryDate: "2025-02-01", qrCode: "", productionCode: "PR001", ICCode: "" },
                    { packaging: "BOX8", productCode: "P002", batchId: "B002", manufacturingDate: "2024-02-01", expiryDate: "2025-02-01", qrCode: "", productionCode: "PR001", ICCode: "" },
                    { packaging: "BOX9", productCode: "P003", batchId: "B003", manufacturingDate: "2024-03-01", expiryDate: "2025-03-01", qrCode: "", productionCode: "PR001", ICCode: "" },
                    { packaging: "BOX10", productCode: "P003", batchId: "B003", manufacturingDate: "2024-03-01", expiryDate: "2025-03-01", qrCode: "", productionCode: "PR001", ICCode: "" }
                ]
            };

            var uniqueBatches = [...new Set(oData.materials.map(item => item.batchId))]
        .map(batchId => ({ batchId }));

    var batchModel = new sap.ui.model.json.JSONModel({ batches: uniqueBatches });
    this.getView().setModel(batchModel, "batchModel");

    var materialModel = new sap.ui.model.json.JSONModel(oData);
    this.getView().setModel(materialModel, "materialModel");
           
        },
    
        onDealerChange: function (oEvent) {
            // Get the selected batch ID
            var sSelectedBatch = oEvent.getSource().getSelectedKey();
        
            // Get the complete materials data
            var oMaterialModel = this.getView().getModel("materialModel");
            var aMaterials = oMaterialModel.getProperty("/materials");
        
            // Filter materials based on the selected batch ID
            var aFilteredMaterials = aMaterials.filter(function (item) {
                return item.batchId === sSelectedBatch;
            });
        
            // Update the table model with filtered data
            var oFilteredModel = new sap.ui.model.json.JSONModel({ materials: aFilteredMaterials });
            this.getView().setModel(oFilteredModel, "filteredMaterialModel");
        }
    });
});