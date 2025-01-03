using ZTRACK_TRACE_SRV from './external/ZTRACK_TRACE_SRV.cds';

service ZTRACK_TRACE_SRVSampleService {
    @readonly
    entity zbatchdetails_Track as projection on ZTRACK_TRACE_SRV.zbatchdetails_Track
    {        key BatchNo, key SerialNo, Material, aufnr, ManufactureDt, ExpiryDt, ProductionOrder, OrderList     }    
;
    @readonly
    entity zbatchno_track as projection on ZTRACK_TRACE_SRV.zbatchno_track
    {        key BatchNo     }    
;
    @readonly
    entity zorderType_Track as projection on ZTRACK_TRACE_SRV.zorderType_Track
    {        key Plant, OrderType     }    
;
    @readonly
    entity ztrack_material as projection on ZTRACK_TRACE_SRV.ztrack_material
    {        key Material, MaterialType, MaterialDesc     }    
;
}