sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
], function (Controller, MessageBox, MessageToast, Fragment, JSONModel) {
    "use strict";

    return Controller.extend("app.home.controller.dealerscreen", {
        onInit: function () {
            // Initialize sample data for materials
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


            var scandatamodel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(scandatamodel, "scandatamodel");
            
            // Create JSONModel with the sample data and set it to the view
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "materialModel");

            // Log the material model data
            console.log("Material Model Data:", oModel.getData());
            this.getBindServices("PR001");
        },

        getBindServices: function (value) {
            try {
                let oModel = this.getView().getModel("materialModel");
                let modelData = oModel.getProperty("/materials");
                let filterData = modelData.filter(item => item.productionCode === value);
        
                // Set the filtered data to materialDataModel
                let dataModel = new JSONModel({ materials: filterData });
                this.getView().setModel(dataModel, "materialDataModel");
        
                // Log the materialDataModel for debugging
                console.log("Filtered materialDataModel: ", dataModel.getData());
            } catch (error) {
                console.error("Error fetching bid details:", error.message);
            }
        },


        // onScanSuccess: function (oEvent) {
        //     // debugger
        //     if (oEvent.getParameter("cancelled")) {
        //       MessageToast.show("Scan cancelled", { duration: 1000 });
        //     } else {
        //       var scanResult = oEvent.getParameter("text");
        //       if (scanResult) {
        //         // Parse the scanned QR code data
        //         var scannedData = JSON.parse(scanResult);


        //         // Set the driverName and cleanerName to the input fields
    
        //         var oDriverInput = this.getView().byId("_IDGenInut5");
        //         var oCleanerInput = this.getView().byId("_IDGeInput6");
        //         var oVehicleData = this.getView().byId("vehicle_id");
        //         var CustumerCode = this.getView().byId("_IDGenInput13");
        //         var Status = this.getView().byId("vehicleDescription_id").setValue("Security Pending , Vehicle Master Missing");
        //         // var Material = this.getView().byId("_IDGenSelect1")
        //         // var MaterialValue = scannedData.material
        //         // var filterMaterial = getMatData.filter(function (data) {
        //         //   return data.MaterialType == MaterialValue;
        //         // });
        //         // var finalMaterial = filterMaterial[0].MaterialDefination
        //         // console.log("filterMaterial", filterMaterial)
    
    
        //         oDriverInput.setValue(scannedData.driverName || "");
        //         oCleanerInput.setValue(scannedData.cleanerName || "");
        //         oVehicleData.setValue(scannedData.assignTruckNo || "")
        //         CustumerCode.setValue(scannedData.shipToParty || "")
        //         // Material.setValue(finalMaterial || "")
        //       } else {
        //         MessageToast.show("No data found in scan", { duration: 1000 });
        //       }
        //       var cust = this.getView().byId("_IDGenInput13").mProperties.value
        //         console.log("cust", cust)
    
        //         var filter = customerData.filter(function (data) {
        //           return data.Kunnr == cust
        //         });
        //         console.log("filter" , filter)
        //         ShipToName = filter[0].Name1
        //         Destination = filter[0].Ort01
        //     }
        //   },
        onScanSuccess: function (oEvent) {
            console.log("onScanSuccess triggered");
        
            // Step 1: Check if the scan was cancelled
            if (oEvent.getParameter("cancelled")) {
                console.log("Scan was cancelled");
                MessageToast.show("Scan cancelled", { duration: 1000 });
                return;
            }
        
            // Step 2: Get the scanned result
            var scanResult = oEvent.getParameter("text");
            console.log("Raw Scan Result:", scanResult);
        
            // Step 3: Handle scanned result if available
            if (scanResult) {
                try {
                    // Parse the scanned QR code data
                    var scannedData = JSON.parse(scanResult);
                    console.log("Parsed Scanned Data:", scannedData);
        
                    // Step 4: Check if rows array exists and is an array
                    if (!scannedData.rows || !Array.isArray(scannedData.rows)) {
                        console.error("Rows array not found in scanned data.");
                        MessageToast.show("Invalid scan data: Rows missing", { duration: 1000 });
                        return;
                    }
        
                    // Step 5: Get or create the scandatamodel
                    var oScanDataModel = this.getView().getModel("scandatamodel");
                    if (!oScanDataModel) {
                        oScanDataModel = new sap.ui.model.json.JSONModel();
                        this.getView().setModel(oScanDataModel, "scandatamodel");
                    }
        
                    // Step 6: Set the rows array to the model
                    oScanDataModel.setProperty("/rows", scannedData.rows);
                    oScanDataModel.setProperty("/ocCode", scannedData.ocCode); // Bind outer code if needed
                    console.log("Rows set to scandatamodel:", oScanDataModel.getProperty("/rows"));
        
                    // Step 7: Set ProductCode and BatchId explicitly for DisplayListItems
                    if (scannedData.rows.length > 0) {
                        // Set ProductCode for binding
                        // oScanDataModel.setProperty("/productCode", scannedData.rows[0].ProductCode);
        
                        // Set BatchId for binding
                        oScanDataModel.setProperty("/batchId", scannedData.rows[0].BatchId);
                    }
        
                    // Step 8: Calculate the total number of unique Packaging2 values
                    var packaging2Values = scannedData.rows.map(function(row) {
                        return row.Packaging2;
                    });
        
                    // Use a Set to filter out duplicates and get unique values
                    var uniquePackaging2 = new Set(packaging2Values);
        
                    // Get the count of unique values
                    var totalPackaging2 = uniquePackaging2.size;
                    oScanDataModel.setProperty("/totalPackaging2", totalPackaging2);
                    console.log("Total unique Packaging2 values:", totalPackaging2);
        
                    // Step 8: Calculate the total number of rows and set in the model
            var totalRows = scannedData.rows.length;
            oScanDataModel.setProperty("/totalRows", totalRows);
            console.log("Total number of rows:", totalRows);

                    // Step 9: Show success message
                    MessageToast.show("Scan successful!", { duration: 1000 });
        
                } catch (error) {
                    console.error("Error parsing scan data:", error);
                    MessageToast.show("Invalid scan data", { duration: 1000 });
                }
            } else {
                console.log("No data found in scan");
                MessageToast.show("No data found in scan", { duration: 1000 });
            }
        }
        
            });
});
