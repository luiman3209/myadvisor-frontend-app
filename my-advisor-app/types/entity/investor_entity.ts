import { NetWorthEnum, IncomeRangeEnum } from '../enums';

export class InvestorEntity {
    investor_id: number;
    user_id: number;
    net_worth: NetWorthEnum | null;
    income_range: IncomeRangeEnum | null;
    geo_preferences: string | null;
    created_at: Date;
    updated_at: Date;

    constructor(
        investor_id: number,
        user_id: number,
        net_worth: NetWorthEnum | null,
        income_range: IncomeRangeEnum | null,
        geo_preferences: string | null,
        created_at: Date,
        updated_at: Date
    ) {
        this.investor_id = investor_id;
        this.user_id = user_id;
        this.net_worth = net_worth;
        this.income_range = income_range;
        this.geo_preferences = geo_preferences;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}