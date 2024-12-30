using {cuid,managed} from '@sap/cds/common';
 
namespace mydb;

entity BatchDetails {
    key batchID : UUID;                 // Unique identifier for the batch
    quantity : Decimal(10,2);          // Quantity of the batch
    manufacturingDate : Date;          // Manufacturing date of the batch
    expiryDate : Date;                 // Expiry date of the batch
    productionID : String(50);         // Identifier for production
    material : String(100);            // Name of the material
    materialCode : String(20);         // Code for the material
}

entity BoxDetails {
    key boxID : UUID;                  // Unique identifier for the box
    qrID : String(200);                // QR code for the box
    batch : Association to BatchDetails; // Association to BatchDetails

    // Manufacturing and expiry dates for validation (optional fields)
    manufacturingDate : Date; 
    expiryDate : Date;

    // Add a virtual/computed validation logic in service or handler if necessary
}