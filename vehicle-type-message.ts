import { VehicleTypeMasterDto } from "src/app/dto/vehicle-type-master-dto";

export class VehicleTypeMessage {
    content: VehicleTypeMasterDto[];
    totalPages: number;
    number: number;
    pageSize: number;
}
