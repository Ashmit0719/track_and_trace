using {mydb} from '../db/schema';


 service hanaservice{
    entity productionOrder as projection on mydb.productionOrder;
    entity material as projection on mydb.material;
    
 }
 