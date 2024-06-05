export class ServiceTypeEntity {
    service_id: number;
    service_type_name: string;
    service_type_code: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;

    constructor(
        service_id: number,
        service_type_name: string,
        service_type_code: string,
        is_active: boolean,
        created_at: Date,
        updated_at: Date
    ) {
        this.service_id = service_id;
        this.service_type_name = service_type_name;
        this.service_type_code = service_type_code;
        this.is_active = is_active;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}