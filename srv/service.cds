using {mydb} from '../db/schema';
using {ZTRACK_TRACE_SRV} from './external/ZTRACK_TRACE_SRV';

 service hanaservice{
    entity productionOrder as projection on mydb.productionOrder;
    entity material as projection on mydb.material;
    entity ztrack_material as projection on ZTRACK_TRACE_SRV.ztrack_material;
    
 }
 