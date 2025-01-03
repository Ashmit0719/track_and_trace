const cds = require("@sap/cds");
module.exports = async (srv) => {


    const ZTRACK_TRACE_SRV = await cds.connect.to("ZTRACK_TRACE_SRV"); 
      srv.on('READ', 'zbatchdetails_Track', req => ZTRACK_TRACE_SRV.run(req.query)); 
      srv.on('READ', 'zbatchno_track', req => ZTRACK_TRACE_SRV.run(req.query)); 
      srv.on('READ', 'zorderType_Track', req => ZTRACK_TRACE_SRV.run(req.query)); 
      srv.on('READ', 'ztrack_material', req => ZTRACK_TRACE_SRV.run(req.query)); 
}